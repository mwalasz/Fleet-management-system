using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.DriverAccounts;
using FleetManagement.Entities.DriverAccounts.DTO;
using FleetManagement.Entities.DriverAccounts.Models;
using FleetManagement.Entities.DriverAccounts.Params;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.Models;
using NHibernate;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class DriverAccountsRepository : DbBasicOperations<DriverAccount>, IDriverAccountProvider
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IHashService hashService;

        public DriverAccountsRepository(ISessionFactory sessionFactory,
            IUserAccountProvider userAccountProvider,
            IHashService hashService) : base(sessionFactory)
        {
            this.userAccountProvider = userAccountProvider;
            this.hashService = hashService;
        }

        public DriverAccount GetByMail(string mail)
        {
            var user = userAccountProvider.GetByMail(mail);

            if (user != null)
                return GetAll()
                    .FirstOrDefault(x => x.UserAccountId == user.Id) ?? null;
            else return null;
        }

        public int AddNewAndGetId(NewDriverAccountParams newDriver)
        {
            try
            {
                userAccountProvider.Add(new UserAccount()
                {
                    Email = newDriver.Email,
                    PasswordHash = hashService.GenerateHash(newDriver.Password),
                    FirstName = newDriver.FirstName,
                    LastName = newDriver.LastName,
                    PhoneNumber = newDriver.PhoneNumber,
                    Role = Roles.Driver,
                });

                var newUser = userAccountProvider.GetByMail(newDriver.Email);

                if (newUser != null)
                {
                    Add(new DriverAccount()
                    {
                        DrivingLicenseNumber = newDriver.DrivingLicenseNumber,
                        UserAccountId = newUser.Id,
                    });

                    var driver = GetByMail(newDriver.Email);

                    return (newDriver != null) ? driver.Id : -1;
                }

                return -1;
            }
            catch (System.Exception)
            {
                return -1;
            }
        }
    }
}
