﻿using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using FleetManagement.Entities.Companies.Params;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Remotion.Linq.Parsing.Structure.IntermediateModel;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous] //TODO: zmienić
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyProvider companyProvider;
        private readonly IMapper mapper;
        private readonly IManagerAccountProvider managerAccountProvider;
        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly IUserAccountProvider userAccountProvider;

        public CompaniesController(ICompanyProvider companyProvider, IMapper mapper, 
            IManagerAccountProvider managerAccountProvider, IDriverAccountProvider driverAccountProvider, IUserAccountProvider userAccountProvider)
        {
            this.companyProvider = companyProvider;
            this.mapper = mapper;
            this.managerAccountProvider = managerAccountProvider;
            this.driverAccountProvider = driverAccountProvider;
            this.userAccountProvider = userAccountProvider;
        }

        [HttpGet]
        public IEnumerable<CompanyDto> GetAll(bool active)
        {
            return companyProvider.GetAll()
                    .Where(x => x.IsActive == active)
                    .Select(c => mapper.Map<Company, CompanyDto>(c));
        }

        [HttpPost]
        public IActionResult Add([FromBody] NewCompanyParam newCompanyParam)
        {
            var manager = managerAccountProvider.GetByMail(newCompanyParam.ManagerMail);

            if (manager == null)
                return BadRequest("Nie znaleziono managera o podanym adresie email!");

            try
            {
                var x = newCompanyParam.NIP;
                var formattedNip = string.Format("{0}-{1}-{2}-{3}", x.Substring(0, 3), x.Substring(3, 3), x.Substring(6, 2), x.Substring(8));

                if (companyProvider.CheckIfThisNameAlreadyExists(newCompanyParam.Name))
                    return BadRequest("Przedsiębiorstwo o takiej nazwie już istnieje!");

                if (companyProvider.CheckIfThisNipAlreadyExists(newCompanyParam.NIP))
                    return BadRequest("Przedsiębiorstwo o takim numerze NIP już istnieje!");

                if (companyProvider.CheckIfThisMailAlreadyExists(newCompanyParam.Mail))
                    return BadRequest("Przedsiębiorstwo o takim mailu już istnieje!");


                companyProvider.Add(new Company()
                {
                    Address = newCompanyParam.Address,
                    Name = newCompanyParam.Name,
                    Description = newCompanyParam.Description,
                    Mail = newCompanyParam.Mail,
                    NIP = formattedNip,
                    PhoneNumber = newCompanyParam.PhoneNumber,
                    ManagerAccountId = manager.Id,
                    IsActive = true,
                });

                return Ok();
            }
            catch (System.Exception e)
            {
                return BadRequest($"Błąd w trakcie dodawania nowego przedsiębiorstwa: {e.Message}");
            }
        }


        /// <summary>
        /// Zmienia dostępność konta firmowego oraz jego kierowców.
        /// </summary>
        /// <param name="nips"></param>
        /// <param name="isActive"></param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult ChangeAvailability(IEnumerable<string> nips, bool isActive = false)
        {
            var companies = companyProvider.GetAll()
                .Where(company => nips.Contains(company.NIP));

            if (companies.Count().Equals(0))
                return NotFound("Nie znaleziono podanych przedsiębiorstw.");

            foreach (var company in companies)
            {
                var companyManagerId = managerAccountProvider.GetById(company.ManagerAccountId).UserAccountId;
                var companyDriversIds = company.Drivers.Select(x => x.UserAccountId);
                var usersToUpdate = companyDriversIds.Append(companyManagerId);
                userAccountProvider.UpdateAvailability(usersToUpdate, isActive);

                company.IsActive = isActive;
                companyProvider.Update(company);
            }

            return Ok("Pomyślnie zaktualizowano dostępność podanych użytkowników.");
        }

        [HttpGet]
        public IActionResult GetDrivers(string nip)
        {
            var company = companyProvider.GetByNip(nip);

            if (company == null)
                return NotFound("Nie znaleziono przedsiębiorstwa o podanym numerze NIP!");

            return Ok(mapper.Map<Company, CompanyDto>(company).Drivers);
        }

        [HttpGet]
        public IActionResult GetVehicles(string managerMail, bool extended = false, bool active = true)
        {
            var manager = managerAccountProvider.GetByMail(managerMail);

            if (manager == null)
                return NotFound("Nie znaleziono podanego kierownika!");

            var company = companyProvider.GetAll()
                .FirstOrDefault(x => x.ManagerAccountId == manager.Id);

            if (manager == null)
                return NotFound("Podany manager nie zarządza żadnym przedsiębiorstwem!");

            var vehicles = company.Vehicles.Where(x => x.IsActive == active).ToList();

            if (vehicles.Count != 0)
            {
                return extended
                    ? Ok(vehicles.Select(x => mapper.Map<Vehicle, VehicleDto>(x)))
                    : Ok(vehicles.Select(x => mapper.Map<Vehicle, VehicleBasicInfoDto>(x)));
            }
        
            return Ok(vehicles);
        }

        [HttpGet]
        public IActionResult GetEmployedAndUnemployed(string nip)
        {
            var company = companyProvider.GetByNip(nip);

            if (company == null)
                return NotFound("Nie znaleziono przedsiębiorstwa o podanym numerze NIP!");

            var drivers = driverAccountProvider.GetUnemployedDrivers();
            var unemployed = drivers.Select(x => mapper.Map<DriverAccount, DriverAccountBasicInfoDto>(x)).ToList();
            var employed = mapper.Map<Company, CompanyDto>(company).Drivers;

            return Ok(new CompanyDrivers() { Employed = employed, Unemployed = unemployed } );
        }

        [HttpPut]
        public IActionResult UpdateDrivers([FromBody] UpdateEmployedDrivers updateEmployedDrivers)
        {
            var company = companyProvider.GetByNip(updateEmployedDrivers.NIP);

            if (company == null)
                return NotFound("Nie znaleziono przedsiębiorstwa o podanym numerze NIP!");

            var allFutureDrivers = driverAccountProvider.GetDriversFromMailList(updateEmployedDrivers.DriverMails);
            var alreadyEmployed = mapper.Map<Company, CompanyDto>(company).Drivers;
                
            driverAccountProvider.RemoveVehiclesFromNewDrivers(alreadyEmployed, allFutureDrivers);

            return companyProvider.UpdateDriversList(updateEmployedDrivers.NIP, allFutureDrivers)
                ? Ok() 
                : (IActionResult)BadRequest();
        }
    }
}
