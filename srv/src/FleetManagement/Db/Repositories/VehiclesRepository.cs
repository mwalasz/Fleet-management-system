using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class VehiclesRepository : DbBasicOperations<Vehicle>, IVehicleProvider
    {
        private readonly ISessionFactory sessionFactory;

        public VehiclesRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
