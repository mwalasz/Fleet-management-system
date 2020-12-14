using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Maintenances;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Maintenances.Params;
using NHibernate;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class MaintenancesRepository : DbBasicOperations<Maintenance>, IMaintenanceProvider
    {
        private readonly ISessionFactory sessionFactory;

        public MaintenancesRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }

        public Maintenance GetByParams(NewMaintenanceParams newMaintenanceParams)
        {
            return GetAll()
                .Where(x => x.Cost == newMaintenanceParams.Cost)
                .Where(x => x.Description == newMaintenanceParams.Description)
                .Where(x => x.MaintenanceProviderDescription == newMaintenanceParams.ProviderDescription)
                .FirstOrDefault(x => x.OdometerMileage == newMaintenanceParams.OdometerMileage);
        }
    }
}
