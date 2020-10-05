using FleetManagement.Db.Seeds;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    public class DataBaseController : ControllerBase
    {
        private readonly IDbSeeder<IUserAccountProvider, UserAccount> userAccountsSeeder;

        public DataBaseController(IDbSeeder<IUserAccountProvider, UserAccount> accountsSeeder)
        {
            this.userAccountsSeeder = accountsSeeder;
        }

        [HttpGet]
        public void Seed()
        {
            userAccountsSeeder.Seed(UserAccounts);
        }

        private readonly IEnumerable<UserAccount> UserAccounts = new List<UserAccount>()
        {
            new UserAccount()
            {
                FirstName = "Ala",
                LastName = "Elementarzowa",
                Email = "a.la@poczta.pl",
                PasswordHash = "sadsdadd",
                PhoneNumber = "123456789",
                Role = "test",
            },
            new UserAccount()
            {
                FirstName = "Mietek",
                LastName = "Mietczynski",
                Email = "mietek@poczta.pl",
                PasswordHash = "sadsdadd",
                PhoneNumber = "987654321",
                Role = "test",
            }
        };
    }
}
