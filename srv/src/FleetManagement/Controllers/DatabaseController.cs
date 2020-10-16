using AutoWrapper.Wrappers;
using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.Seeds;
using FleetManagement.Entities.DriverAccounts;
using FleetManagement.Entities.DriverAccounts.Models;
using FleetManagement.Entities.ManagerAccounts;
using FleetManagement.Entities.ManagerAccounts.Models;
using FleetManagement.Entities.Refuelings;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
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
        private readonly IDbSeeder<IVehicleProvider, Vehicle> vehiclesSeeder;
        private readonly IDbSeeder<IPowertrainProvider, Powertrain> powertrainsSeeder;
        private readonly IDbSeeder<IRefuelingProvider, Refueling> refuelingsSeeder;

        private readonly List<UserAccount> userAccounts = new List<UserAccount>();
        private readonly List<ManagerAccount> managerAccounts = new List<ManagerAccount>();
        private readonly List<DriverAccount> driverAccounts = new List<DriverAccount>();
        private readonly List<Vehicle> vehicles = new List<Vehicle>();
        private readonly List<Powertrain> powertrains = new List<Powertrain>();
        private readonly List<Refueling> refuelings = new List<Refueling>();

        public DataBaseController(IHashService hashService,
            IDbSeeder<IUserAccountProvider, UserAccount> usersSeeder,
            IDbSeeder<IManagerAccountProvider, ManagerAccount> managersSeeder,
            IDbSeeder<IDriverAccountProvider, DriverAccount> driversSeeder,
            IDbSeeder<IVehicleProvider, Vehicle> vehiclesSeeder,
            IDbSeeder<IPowertrainProvider, Powertrain> powertrainsSeeder,
            IDbSeeder<IRefuelingProvider, Refueling> refuelingsSeeder)
        {
            this.hashService = hashService;
            this.userAccountsSeeder = usersSeeder;
            this.managerAccountsSeeder = managersSeeder;
            this.driversSeeder = driversSeeder;
            this.vehiclesSeeder = vehiclesSeeder;
            this.powertrainsSeeder = powertrainsSeeder;
            this.refuelingsSeeder = refuelingsSeeder;
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

                vehicles.AddRange(CreateVehicles());
                vehiclesSeeder.Seed(vehicles);

                powertrains.AddRange(CreatePowertrains());
                powertrainsSeeder.Seed(powertrains);

                refuelings.AddRange(CreateRefuelings());
                refuelingsSeeder.Seed(refuelings);
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

        private IEnumerable<Vehicle> CreateVehicles()
        {
            return new List<Vehicle>()
            {
                new Vehicle()
                {
                    Brand = "Volkswagen",
                    Model = "Polo",
                    KmMileage = 180000,
                    LicensePlate = "S0 12345",
                    VIN = "WVWZZZ9NZ12345",
                    YearOfProduction = 2003,
                    TechnicalInspectionDate = new DateTime(2021, 2, 10),
                    PowertrainId = 1
                },
                new Vehicle()
                {
                    Brand = "Volkswagen",
                    Model = "Passat",
                    KmMileage = 5000,
                    LicensePlate = "W0 54321",
                    VIN = "someVINnumber",
                    YearOfProduction = 2019,
                    TechnicalInspectionDate = new DateTime(2025, 1, 1),
                    PowertrainId = 1
                }
            };
        }

        private IEnumerable<Powertrain> CreatePowertrains()
        {
            return new List<Powertrain>()
            {
                new Powertrain()
                {
                    Id = 1,
                    NumberOfCylinders = 4,
                    EngineCapacity = 1898,
                    EngineType = "Diesel",
                    DriveType = "FWD"
                }
            };
        }
        private IEnumerable<Refueling> CreateRefuelings()
        {
            return new List<Refueling>()
            {
                new Refueling()
                {
                    Id = 1,
                    Cost = 5.54,
                    Liters = 1,
                    CostPerLiter = 5.54
                }
            };
        }
    }
}
