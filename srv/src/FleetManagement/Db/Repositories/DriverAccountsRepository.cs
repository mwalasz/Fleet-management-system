using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.DriverAccounts;
using FleetManagement.Entities.DriverAccounts.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class DriverAccountsRepository : DbBasicOperations<DriverAccount>, IDriverAccountProvider
    {
        public DriverAccountsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
        }
    }
}
