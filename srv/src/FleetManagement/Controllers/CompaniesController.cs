using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Companies;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NHibernate.Util;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous] //TODO: zmienić
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyProvider companyProvider;
        private readonly IDriverAccountProvider driverAccountProvider;

        public CompaniesController(ICompanyProvider companyProvider, IDriverAccountProvider driverAccountProvider)
        {
            this.companyProvider = companyProvider;
            this.driverAccountProvider = driverAccountProvider;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(companyProvider.GetAll());
        }
    }
}
