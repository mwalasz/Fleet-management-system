using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Powertrains.Models;
using FleetManagement.Entities.Vehicles.Params;

namespace FleetManagement.Entities.Powertrains
{
    public interface IPowertrainProvider : IBaseOperations<Powertrain>
    {
        /// <summary>
        /// Tworzy nowy obiekt napędu na podstawie danych nowego pojazdu.
        /// </summary>
        /// <param name="newVehicle"></param>
        /// <returns></returns>
        public Powertrain CreateNewAndGet(NewVehicleParams newVehicle);
    }
}
