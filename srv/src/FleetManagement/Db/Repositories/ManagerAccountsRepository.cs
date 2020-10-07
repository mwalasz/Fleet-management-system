using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.ManagerAccounts;
using FleetManagement.Entities.ManagerAccounts.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class ManagerAccountsRepository : DbBasicOperations<ManagerAccount>, IManagerAccountProvider
    {
        public ManagerAccountsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
        }
    }
}
