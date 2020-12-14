using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Maintenances.Params;

namespace FleetManagement.Entities.Maintenances
{
    public interface IMaintenanceProvider : IBaseOperations<Maintenance>
    {
        public Maintenance GetByParams(NewMaintenanceParams newMaintenanceParams);
    }
}
