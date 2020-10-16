using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Maintenances;
using FleetManagement.Entities.Maintenances.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class MaintenanceRepository : DbBasicOperations<Maintenance>, IMaintenanceProvider
    {
        private readonly ISessionFactory sessionFactory;

        public MaintenanceRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
