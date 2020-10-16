using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Refuelings;
using FleetManagement.Entities.Refuelings.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class RefuelingRepository : DbBasicOperations<Refueling>, IRefuelingProvider
    {
        private readonly ISessionFactory sessionFactory;

        public RefuelingRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
