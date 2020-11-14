using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class TripsRepository : DbBasicOperations<Trip>, ITripProvider
    {
        private readonly ISessionFactory sessionFactory;

        public TripsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
