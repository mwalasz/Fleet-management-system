using AutoMapper;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
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

        public CompaniesController(ICompanyProvider companyProvider, IMapper mapper)
        {
            this.companyProvider = companyProvider;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var companies = companyProvider.GetAll();
            return Ok(companies.Select(c => mapper.Map<Company, CompanyDto>(c)));
        }
    }
}
