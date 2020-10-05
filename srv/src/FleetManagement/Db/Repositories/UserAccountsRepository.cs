using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.Models;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Db.Repositories
{
    public class UserAccountsRepository : DbBasicOperations<UserAccount>, IUserAccountProvider
    {
        public UserAccountsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
        }
    }
}
