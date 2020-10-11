using AutoWrapper.Wrappers;
using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.Seeds;
using FleetManagement.Entities.DriverAccounts;
using FleetManagement.Entities.DriverAccounts.Models;
using FleetManagement.Entities.ManagerAccounts;
using FleetManagement.Entities.ManagerAccounts.Models;
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
    [AllowAnonymous]
    public class DataBaseController : ControllerBase
    {
        private readonly IHashService hashService;
        private readonly IDbSeeder<IUserAccountProvider, UserAccount> userAccountsSeeder;
        private readonly IDbSeeder<IManagerAccountProvider, ManagerAccount> managerAccountsSeeder;
        private readonly IDbSeeder<IDriverAccountProvider, DriverAccount> driversSeeder;

        private readonly List<UserAccount> userAccounts = new List<UserAccount>();
        private readonly List<ManagerAccount> managerAccounts = new List<ManagerAccount>();
        private readonly List<DriverAccount> driverAccounts = new List<DriverAccount>();

        public DataBaseController(IHashService hashService,
            IDbSeeder<IUserAccountProvider, UserAccount> usersSeeder,
            IDbSeeder<IManagerAccountProvider, ManagerAccount> managersSeeder,
            IDbSeeder<IDriverAccountProvider, DriverAccount> driversSeeder)
        {
            this.hashService = hashService;
            this.userAccountsSeeder = usersSeeder;
            this.managerAccountsSeeder = managersSeeder;
            this.driversSeeder = driversSeeder;
        }

        [HttpGet]
        public async Task<ApiResponse> Seed()
        {
            try
            {
                userAccounts.AddRange(CreateUserAccounts());
                userAccountsSeeder.Seed(userAccounts);
            
                managerAccounts.AddRange(CreateManagerAccounts());
                managerAccountsSeeder.Seed(managerAccounts);

                driverAccounts.AddRange(CreateDriverAccounts());
                driversSeeder.Seed(driverAccounts);
            }
            catch (Exception e)
            {
                return new ApiResponse($"Błąd w trakcie dodawania elementów do bazy danych: {e.InnerException.Message}");
            }

            return new ApiResponse($"Pomyślnie dodano elementy do BD.");
        }

        private IEnumerable<UserAccount> CreateUserAccounts()
        {
            return new List<UserAccount>() 
            { 
                new UserAccount()
                {
                    Id = 1,
                    IsActive = true,
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
                    IsActive = true,
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
                    IsActive = true,
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
                    IsActive = true,
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

        private IEnumerable<DriverAccount> CreateDriverAccounts()
        {
            return new List<DriverAccount>()
            {
                new DriverAccount()
                {
                    UserAccountId = 2,
                    DrivingLicenseNumber = "jebacpis",
                    Vehicles = "VW Polo",
                }
            };
        }
    }
}
