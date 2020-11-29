using AutoMapper;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using FleetManagement.Entities.Companies.Params;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        public CompaniesController(ICompanyProvider companyProvider, IMapper mapper, IManagerAccountProvider managerAccountProvider)
        {
            this.companyProvider = companyProvider;
            this.mapper = mapper;
            this.managerAccountProvider = managerAccountProvider;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var companies = companyProvider.GetAll();
            return Ok(companies.Select(c => mapper.Map<Company, CompanyDto>(c)));
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
                });

                return Ok();
            }
            catch (System.Exception e)
            {
                return BadRequest($"Error while adding new company: {e.Message}");
            }
        }
    }
}
