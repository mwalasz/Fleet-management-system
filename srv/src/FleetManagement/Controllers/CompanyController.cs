using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Db.Repositories
{

    [ApiController]
    [DefaultRoute]
    [AllowAnonymous]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyProvider companyProvider;

        public CompanyController(ICompanyProvider companyProvider)
        {
            this.companyProvider = companyProvider;
        }

        [HttpGet]
        public async Task<IEnumerable<Company>> GetAllCompanies()
        {
            return await companyProvider.GetAllAsync();
        }
    }
}
