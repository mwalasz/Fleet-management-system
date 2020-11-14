using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Settings;
using Microsoft.Extensions.Options;
using NHibernate;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class UserAccountsRepository : DbBasicOperations<UserAccount>, IUserAccountProvider
    {
        private readonly IHashService hashService;

        public UserAccountsRepository(IHashService hashService,
            ISessionFactory sessionFactory, IOptions<JwtSettings> options) : base(sessionFactory)
        {
            this.hashService = hashService;
        }

        public int AddNewAndGetId(INewAccountParams newAccountParams)
        {
            try
            {
                Add(new UserAccount()
                {
                    Email = newAccountParams.Email,
                    PasswordHash = hashService.GenerateHash(newAccountParams.Password),
                    FirstName = newAccountParams.FirstName,
                    LastName = newAccountParams.LastName,
                    PhoneNumber = newAccountParams.PhoneNumber,
                    Role = Roles.Admin,
                    IsActive = true,
                });

                var newUser = GetByMail(newAccountParams.Email);

                return (newUser != null) ? newUser.Id : -1;
            }
            catch (System.Exception)
            {
                return -1;
            }
        }

        /// <summary>
        /// Zwraca użytkownika o podanym mailu lub null gdy takiego nie ma.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public UserAccount GetByMail(string email)
        {
            return GetAll()
                .FirstOrDefault(x => x.Email.Equals(email)) ?? null;
        }

        /// <summary>
        /// Aktualizuje hasło użytkownika.
        /// </summary>
        /// <param name="mail">Mail identyfikujący użytkownika.</param>
        /// <param name="password">Nowe hasło.</param>
        public bool UpdateCredentials(string mail, string password)
        {
            try
            {
                var user = GetByMail(mail);

                if (user != null)
                {
                    user.PasswordHash = hashService.GenerateHash(password);
                
                    Update(user);

                    return true;
                }

                return false;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
    }
}
