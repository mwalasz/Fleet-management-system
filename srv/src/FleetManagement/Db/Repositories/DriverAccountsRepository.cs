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

        public int AddNewAndGetId(INewAccountParams newAccount)
        {
            var newAccountParams = (NewDriverAccountParams)newAccount;

            try
            {
                userAccountProvider.Add(new UserAccount()
                {
                    Email = newAccountParams.Email,
                    PasswordHash = hashService.GenerateHash(newAccountParams.Password),
                    FirstName = newAccountParams.FirstName,
                    LastName = newAccountParams.LastName,
                    PhoneNumber = newAccountParams.PhoneNumber,
                    Role = Roles.Driver,
                    IsActive = true,
                });

                var newUser = userAccountProvider.GetByMail(newAccountParams.Email);

                if (newUser != null)
                {
                    Add(new DriverAccount()
                    {
                        DrivingLicenseNumber = newAccountParams.DrivingLicenseNumber,
                        UserAccountId = newUser.Id,
                    });

                    var driver = GetByMail(newAccountParams.Email);

                    return (newAccountParams != null) ? driver.Id : -1;
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
