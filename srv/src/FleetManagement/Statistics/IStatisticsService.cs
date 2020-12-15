using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Statistics.Models.Drivers;
using FleetManagement.Statistics.Models.Vehicles;

namespace FleetManagement.Statistics
{
    public interface IStatisticsService
    {
        /// <summary>
        /// Oblicza statystyki jazdy kierowcy.
        /// </summary>
        /// <param name="driverAccount"></param>
        /// <returns></returns>
        public DriverStatistics CalculateDriverDrivingData(DriverAccount driverAccount);

        /// <summary>
        /// Oblicza sumaryczne koszty eksploatacji pojazdu.
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        public VehicleSummaryCosts CalculateVehicleCostsData(Vehicle vehicle);
     
        /// <summary>
        /// Oblicza sumaryczne statystyki danego pojazdu. 
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        public VehicleStatistics CalculateVehicleDrivingData(Vehicle vehicle);
    }
}
