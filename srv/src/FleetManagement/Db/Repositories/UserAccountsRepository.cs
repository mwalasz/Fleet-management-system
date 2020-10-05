using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.Models;
using NHibernate;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class UserAccountsRepository : DbBasicOperations<UserAccount>, IUserAccountProvider
    {
        public UserAccountsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
        }

        /// <summary>
        /// Zwraca użytkownika o podanym mailu lub null gdy takiego nie ma.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public UserAccount GetUserByEmail(string email)
        {
            return GetAll().
                FirstOrDefault(x => x.Email.Equals(email)) ?? null;
        }
    }
}
