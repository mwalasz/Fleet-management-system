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
            var manager = managerAccountProvider.GetByMail(newCompanyParam.ManagerAccountMail);

            if (manager == null)
                return BadRequest("Nie znaleziono managera o podanym adresie email!");

            try
            {
                companyProvider.Add(new Company()
                {
                    Address = newCompanyParam.Address,
                    Name = newCompanyParam.Name,
                    Description = newCompanyParam.Description,
                    Mail = newCompanyParam.Mail,
                    NIP = newCompanyParam.NIP,
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
