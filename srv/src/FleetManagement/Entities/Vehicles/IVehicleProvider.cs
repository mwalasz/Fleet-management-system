using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Vehicles.Models;
using System.Collections.Generic;

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

        /// <summary>
        /// Zwraca listę obiektów pojazdów, na podstawie przekazanej tablicy numerów VIN.
        /// </summary>
        /// <param name="vinNumbers">Numery VIN pojazdów do znalezienia</param>
        /// <returns></returns>
        public List<Vehicle> GetVehiclesByVinNumber(string[] vinNumbers);
    }
}
