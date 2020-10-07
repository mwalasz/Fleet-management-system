using AutoMapper;
using FleetManagement.Authentication.Policies;
using FleetManagement.Entities.ManagerAccounts;
using FleetManagement.Entities.ManagerAccounts.DTO;
using FleetManagement.Entities.ManagerAccounts.Models;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.DTO;
using FleetManagement.Entities.UserAccounts.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [Authorize(Policy = Policy.AdminsAcces)]
    public class UserAccountsController : ControllerBase
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IManagerAccountProvider managerAccountProvider;
        private readonly IMapper mapper;

        public UserAccountsController(IUserAccountProvider userAccountProvider,
            IManagerAccountProvider managerAccountProvider,
            IMapper mapper)
        {
            this.userAccountProvider = userAccountProvider;
            this.managerAccountProvider = managerAccountProvider;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<UserAccountDto> GetAllUserAccounts()
        {
            return userAccountProvider.GetAll()
                .Select(user => mapper.Map<UserAccount, UserAccountDto>(user));
        }

        [HttpGet]
        public IEnumerable<ManagerAccountDto> GetAllManagersAccounts()
        {
            return managerAccountProvider.GetAll()
                .Select(manager => mapper.Map<ManagerAccount, ManagerAccountDto>(manager));
        }
    }
}
