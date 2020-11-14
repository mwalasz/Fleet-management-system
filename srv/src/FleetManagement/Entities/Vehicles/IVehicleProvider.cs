using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Vehicles.Models;

namespace FleetManagement.Entities.Vehicles
{
    public interface IVehicleProvider : IBaseOperations<Vehicle>
    {
        
        /// <summary>
        /// Zwraca pojazd o podanym numerze vin.
        /// </summary>
        /// <param name="vin"></param>
        /// <returns></returns>
        public Vehicle GetByVinNumber(string vin);
    }
}
