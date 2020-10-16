using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class PowertrainRepository : DbBasicOperations<Powertrain>, IPowertrainProvider
    {
        private readonly ISessionFactory sessionFactory;

        public PowertrainRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
