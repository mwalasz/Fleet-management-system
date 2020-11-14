using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Maintenances;
using FleetManagement.Entities.Maintenances.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class MaintenancesRepository : DbBasicOperations<Maintenance>, IMaintenanceProvider
    {
        private readonly ISessionFactory sessionFactory;

        public MaintenancesRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
