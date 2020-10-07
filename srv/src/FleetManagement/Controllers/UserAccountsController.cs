using AutoMapper;
using FleetManagement.Authentication.Policies;
using FleetManagement.Entities.DriverAccounts;
using FleetManagement.Entities.DriverAccounts.DTO;
using FleetManagement.Entities.DriverAccounts.Models;
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
        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly IMapper mapper;

        public UserAccountsController(IUserAccountProvider userAccountProvider,
            IManagerAccountProvider managerAccountProvider,
            IDriverAccountProvider driverAccountProvider,
            IMapper mapper)
        {
            this.userAccountProvider = userAccountProvider;
            this.managerAccountProvider = managerAccountProvider;
            this.driverAccountProvider = driverAccountProvider;
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

        [HttpGet]
        public IEnumerable<DriverAccountDto> GetAllDriversAccounts()
        {
            return driverAccountProvider.GetAll()
                .Select(driver => mapper.Map<DriverAccount, DriverAccountDto>(driver));
        }
    }
}
