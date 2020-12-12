using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Companies.Models;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Entities.Vehicles.Params;
using System.Collections.Generic;

namespace FleetManagement.Entities.Vehicles
{
    public interface IVehicleProvider : IBaseOperations<Vehicle>
    {
        /// <summary>
        /// Sprawdza, czy istnieje już pojazd o podanej tablicy rejestracyjnej.
        /// </summary>
        /// <param name="licensePlate"></param>
        /// <returns></returns>
        public bool CheckIfThisLicensePlateAlreadyExists(string licensePlate);

        /// <summary>
        /// Sprawdza, czy istnieje już pojazd o podanym numerze vin.
        /// </summary>
        /// <param name="vin"></param>
        /// <returns></returns>
        public bool CheckIfThisVinAlreadyExists(string vin);


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

        /// <summary>
        /// Zwraca krótki opis pojazdu w postaci "Marka Model".
        /// </summary>
        /// <param name="vin"></param>
        /// <returns></returns>
        public string GetVehicleName(string vin);

        /// <summary>
        /// Dodaje nowy pojazd do przedsiębiorstwa.
        /// </summary>
        /// <returns></returns>
        public bool AddNewVehicle(NewVehicleParams newVehicle, Company company);
    }
}
