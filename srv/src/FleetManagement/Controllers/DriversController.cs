using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.DTO;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.DriverAccounts.Params;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous]
    //[Authorize(Roles = CustomRoles.AdminAndManager)]
    public class DriversController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly ITripProvider tripProvider;
        private readonly IVehicleProvider vehicleProvider;
        private readonly ICompanyProvider companyProvider;

        public DriversController(IMapper mapper, IDriverAccountProvider driverAccountProvider,
            ITripProvider tripProvider, IVehicleProvider vehicleProvider, ICompanyProvider companyProvider)
        {
            this.mapper = mapper;
            this.driverAccountProvider = driverAccountProvider;
            this.tripProvider = tripProvider;
            this.vehicleProvider = vehicleProvider;
            this.companyProvider = companyProvider;
        }

        [HttpGet]
        public IEnumerable<DriverAccountDto> GetAll()
        {
            return driverAccountProvider.GetAll()
                .Select(driver => mapper.Map<DriverAccount, DriverAccountDto>(driver));
        }

        [HttpGet]
        public IActionResult GetDriverCompany(string mail)
        {
            var company = driverAccountProvider.GetDriverCompany(mail);

            if (company != null)
                return Ok(mapper.Map<Company, CompanyDto>(company));
            else return Ok(company);
        }

        [HttpGet]
        public IActionResult GetAssignedVehicles([FromQuery] string mail, bool extended = false)
        {
            var emptyList = new List<VehicleBasicInfoDto>();
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver != null)
            {
                var vehicles = driver.Vehicles.ToList();

                if (vehicles.Count != 0)
                {
                    return extended
                        ? Ok(vehicles.Select(x => mapper.Map<Vehicle, VehicleDto>(x)))
                        : Ok(vehicles.Select(x => mapper.Map<Vehicle, VehicleBasicInfoDto>(x)));
                }

                return Ok(vehicles);
            }
            
            return BadRequest("Użytkownik nie jest kierowcą lub podano błędny mail!");
        }

        [HttpPost]
        public IActionResult Add([FromBody] NewDriverAccountParams newDriverParams)
        {
            var newDriverId = driverAccountProvider.AddNewAndGetId(newDriverParams);
            
            if (newDriverId != -1)
            {
                var newDriver = driverAccountProvider.GetById(newDriverId);

                var toReturn = (newDriver != null)
                    ? mapper.Map<DriverAccount, DriverAccountDto>(newDriver)
                    : null;

                return Ok(toReturn);
            }

            return Ok("Błąd w trakcie dodawania nowego kierowcy!");
        }

        [HttpGet]
        public IActionResult GetAllTrips([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver != null)
            {
                var trips = tripProvider.GetAll()
                    .Where(x => x.DriverAccountId == driver.Id);

                return Ok(trips.Count() != 0 ? trips.Select(x => mapper.Map<Trip, TripDto>(x)) : new List<TripDto>());
            }

            return NotFound("Nie znaleziono kierowcy o podanym mailu!");
        }

        [HttpPut]
        public IActionResult ChangeAvailableVehicles([FromBody] ChangeAvailableVehiclesParams changeUserVehiclesParams)
        {
            var driver = driverAccountProvider.GetByMail(changeUserVehiclesParams.Mail);

            if (driver != null)
            {
                try
                {
                    var newList = vehicleProvider.GetVehiclesByVinNumber(changeUserVehiclesParams.VehiclesVin);

                    driver.Vehicles = newList;
                    driverAccountProvider.Update(driver);

                    return Ok("Pomyślnie zaktualizowano listę dostępnych pojazdów.");
                }
                catch (System.Exception e)
                {
                    BadRequest(e);
                }
            }
            
            return BadRequest("Użytkownik nie jest kierowcą lub podano błędny mail!");
        }
    }
}
