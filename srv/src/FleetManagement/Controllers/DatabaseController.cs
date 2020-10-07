using AutoWrapper.Wrappers;
using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.Seeds;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    public class DataBaseController : ControllerBase
    {
        private readonly IHashService hashService;
        private readonly IDbSeeder<IUserAccountProvider, UserAccount> userAccountsSeeder;

        public DataBaseController(IHashService hashService,
            IDbSeeder<IUserAccountProvider, UserAccount> accountsSeeder)
        {
            this.hashService = hashService;
            this.userAccountsSeeder = accountsSeeder;
        }

        [HttpGet]
        public void Seed()
        {
            UserAccounts.AddRange(CreateUserAccounts());
    
            userAccountsSeeder.Seed(UserAccounts);
        }

        private List<UserAccount> UserAccounts = new List<UserAccount>();

        private IEnumerable<UserAccount> CreateUserAccounts()
        {
            return new List<UserAccount>() 
            { 
                new UserAccount()
                {
                    FirstName = "Ala",
                    LastName = "Elementarzowa",
                    Email = "ala@poczta.pl",
                    PasswordHash = hashService.GenerateHash("admin"),
                    PhoneNumber = "123456789",
                    Role = Roles.Admin,
                },
                new UserAccount()
                {
                    FirstName = "Mietek",
                    LastName = "Mietczynski",
                    Email = "mietek@poczta.pl",
                    PasswordHash = hashService.GenerateHash("mietek"),
                    PhoneNumber = "987654321",
                    Role = "test",
                }
            };   
        }
    }
}
