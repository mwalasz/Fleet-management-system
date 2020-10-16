using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class TripRepository : DbBasicOperations<Trip>, ITripProvider
    {
        private readonly ISessionFactory sessionFactory;

        public TripRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
