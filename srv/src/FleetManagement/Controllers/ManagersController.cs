using AutoMapper;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Accounts.ManagerAccounts.DTO;
using FleetManagement.Entities.Accounts.ManagerAccounts.Models;
using FleetManagement.Entities.Accounts.ManagerAccounts.Params;
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
        private readonly IManagerAccountProvider managerAccountProvider;

        public ManagersController(IMapper mapper,
            IManagerAccountProvider managerAccountProvider)
        {
            this.mapper = mapper;
            this.managerAccountProvider = managerAccountProvider;
        }

        [HttpGet]
        public IEnumerable<ManagerAccountDto> GetAll()
        {
            return managerAccountProvider.GetAll()
                .Select(manager => mapper.Map<ManagerAccount, ManagerAccountDto>(manager));
        }

        [HttpPost]
        public IActionResult AddNewManager([FromQuery] NewManagerAccountParams newDriverParams)
        {
            var newManagerId = managerAccountProvider.AddNewAndGetId(newDriverParams);

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
