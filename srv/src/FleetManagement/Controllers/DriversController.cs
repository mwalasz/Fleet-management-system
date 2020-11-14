using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.DTO;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.DriverAccounts.Params;
using FleetManagement.Entities.Companies.Models;
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

        public DriversController(IMapper mapper, IDriverAccountProvider driverAccountProvider)
        {
            this.mapper = mapper;
            this.driverAccountProvider = driverAccountProvider;
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

        [HttpPost]
        public IActionResult AddNewDriver([FromQuery] NewDriverAccountParams newDriverParams)
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
    }
}
