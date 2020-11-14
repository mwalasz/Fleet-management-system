using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Refuelings;
using FleetManagement.Entities.Refuelings.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class RefuelingsRepository : DbBasicOperations<Refueling>, IRefuelingProvider
    {
        private readonly ISessionFactory sessionFactory;

        public RefuelingsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
