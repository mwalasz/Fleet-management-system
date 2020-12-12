using AutoMapper;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Accounts.ManagerAccounts.DTO;
using FleetManagement.Entities.Accounts.ManagerAccounts.Models;
using FleetManagement.Entities.Accounts.ManagerAccounts.Params;
using FleetManagement.Entities.Companies;
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
    public class ManagersController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ICompanyProvider companyProvider;
        private readonly IManagerAccountProvider managerAccountProvider;

        public ManagersController(IMapper mapper, ICompanyProvider companyProvider,
            IManagerAccountProvider managerAccountProvider)
        {
            this.mapper = mapper;
            this.companyProvider = companyProvider;
            this.managerAccountProvider = managerAccountProvider;
        }

        [HttpGet]
        public IEnumerable<ManagerAccountDto> GetAll()
        {
            return managerAccountProvider.GetAll()
                .Select(manager => mapper.Map<ManagerAccount, ManagerAccountDto>(manager));
        }

        [HttpGet]
        public IActionResult GetCompany(string mail)
        {
            var manager = managerAccountProvider.GetByMail(mail);

            if (manager == null)
                return NotFound("Nie znaleziono podanego kierownika!");

            var company = managerAccountProvider.GetCompany(mail);

            return Ok(mapper.Map<Company, CompanyDto>(company));
        }

        [HttpPost]
        public IActionResult Add([FromBody] NewManagerAccountParams newManagerParams)
        {
            var newManagerId = managerAccountProvider.AddNewAndGetId(newManagerParams);

            if (newManagerId != -1)
            {
                var newManager = managerAccountProvider.GetById(newManagerId);

                var toReturn = (newManager != null)
                    ? mapper.Map<ManagerAccount, ManagerAccountDto>(newManager)
                    : null;

                return Ok(toReturn);
            }

            return Ok("Błąd w trakcie dodawania nowego menadżera!");
        }
    }
}
