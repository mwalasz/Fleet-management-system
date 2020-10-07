using FleetManagement.Authentication.Policies;
using FleetManagement.Entities.UserAccounts;
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
    public class UserController : ControllerBase
    {
        private readonly IUserAccountProvider userAccountProvider;

        public UserController(IUserAccountProvider userAccountProvider)
        {
            this.userAccountProvider = userAccountProvider;
        }

        [HttpGet]
        public IEnumerable<UserAccount> GetAll()
        {
            return userAccountProvider.GetAll();
        }
    }
}
