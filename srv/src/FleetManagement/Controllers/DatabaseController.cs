using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.Seeds;
using FleetManagement.Entities.ManagerAccounts;
using FleetManagement.Entities.ManagerAccounts.Models;
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
        private readonly IHashService hashService;
        private readonly IDbSeeder<IUserAccountProvider, UserAccount> userAccountsSeeder;
        private readonly IDbSeeder<IManagerAccountProvider, ManagerAccount> managerAccountsSeeder;

        public DataBaseController(IHashService hashService,
            IDbSeeder<IUserAccountProvider, UserAccount> usersSeeder,
            IDbSeeder<IManagerAccountProvider, ManagerAccount> managersSeeder)
        {
            this.hashService = hashService;
            this.userAccountsSeeder = usersSeeder;
            this.managerAccountsSeeder = managersSeeder;
        }

        [HttpGet]
        public void Seed()
        {
            UserAccounts.AddRange(CreateUserAccounts());
            ManagerAccounts.AddRange(CreateManagerAccounts());
    
            userAccountsSeeder.Seed(UserAccounts);
            managerAccountsSeeder.Seed(ManagerAccounts);
        }

        private List<UserAccount> UserAccounts = new List<UserAccount>();
        private List<ManagerAccount> ManagerAccounts = new List<ManagerAccount>();

        private IEnumerable<UserAccount> CreateUserAccounts()
        {
            return new List<UserAccount>() 
            { 
                new UserAccount()
                {
                    Id = 1,
                    FirstName = "Ala",
                    LastName = "Elementarzowa",
                    Email = "ala@poczta.pl",
                    PasswordHash = hashService.GenerateHash("admin"),
                    PhoneNumber = "123456789",
                    Role = Roles.Admin,
                },
                new UserAccount()
                {
                    Id = 2,
                    FirstName = "Mietek",
                    LastName = "Mietczynski",
                    Email = "mietek@poczta.pl",
                    PasswordHash = hashService.GenerateHash("mietek"),
                    PhoneNumber = "987654321",
                    Role = "test",
                },
                new UserAccount()
                {
                    Id = 3,
                    FirstName = "Waldek",
                    LastName = "Waldkowski",
                    Email = "waldek@poczta.pl",
                    PasswordHash = hashService.GenerateHash("waldek"),
                    PhoneNumber = "987654321",
                    Role = "test",
                },
                new UserAccount()
                {
                    Id = 4,
                    FirstName = "Stasiek",
                    LastName = "Stasiowski",
                    Email = "stasiek@poczta.pl",
                    PasswordHash = hashService.GenerateHash("stasiek"),
                    PhoneNumber = "987654321",
                    Role = "test",
                }
            };   
        }

        private IEnumerable<ManagerAccount> CreateManagerAccounts()
        {
            return new List<ManagerAccount>()
            { 
                new ManagerAccount()
                {
                    UserAccountId = 3,
                }
            };
        }
    }
}
