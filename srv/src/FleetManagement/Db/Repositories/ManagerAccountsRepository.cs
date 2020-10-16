using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Accounts.ManagerAccounts.Models;
using FleetManagement.Entities.Accounts.ManagerAccounts.Params;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using NHibernate;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class ManagerAccountsRepository : DbBasicOperations<ManagerAccount>, IManagerAccountProvider
    {
        private readonly IHashService hashService;
        private readonly IUserAccountProvider userAccountProvider;

        public ManagerAccountsRepository(ISessionFactory sessionFactory, 
                                         IHashService hashService,
                                         IUserAccountProvider userAccountProvider) : base(sessionFactory)
        {
            this.hashService = hashService;
            this.userAccountProvider = userAccountProvider;
        }

        public int AddNewAndGetId(INewAccountParams newAccount)
        {
            var newAccountParams = (NewManagerAccountParams)newAccount;

            try
            {
                userAccountProvider.Add(new UserAccount()
                {
                    Email = newAccountParams.Email,
                    PasswordHash = hashService.GenerateHash(newAccountParams.Password),
                    FirstName = newAccountParams.FirstName,
                    LastName = newAccountParams.LastName,
                    PhoneNumber = newAccountParams.PhoneNumber,
                    Role = Roles.Manager,
                    IsActive = true,
                });

                var newUser = userAccountProvider.GetByMail(newAccountParams.Email);

                if (newUser != null)
                {
                    Add(new ManagerAccount()
                    {
                        UserAccountId = newUser.Id,
                    });

                    var manager = GetByMail(newAccountParams.Email);

                    return (newAccountParams != null) ? manager.Id : -1;
                }

                return -1;
            }
            catch (System.Exception)
            {
                return -1;
            }
        }

        public ManagerAccount GetByMail(string mail)
        {
            var user = userAccountProvider.GetByMail(mail);

            if (user != null)
                return GetAll()
                    .FirstOrDefault(x => x.UserAccountId == user.Id) ?? null;
            else return null;
        }
    }
}
