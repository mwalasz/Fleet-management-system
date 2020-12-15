using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Statistics.Models.Charts.DataModels;
using FleetManagement.Statistics.Models.Drivers;
using FleetManagement.Statistics.Models.Vehicles;
using System.Collections.Generic;

namespace FleetManagement.Statistics
{
    public interface IStatisticsService
    {
        public DriverStatistics CalculateDriverStatistics(DriverAccount driverAccount);

        public List<PieChartData> CalculateSummaryDistancePerVehicle(DriverAccount driverAccount);

        public List<PieChartData> CalculateSummaryDurationPerVehicle(DriverAccount driverAccount);

        public List<BarChartSpeedData> CalculateSpeedsPerVehicle(DriverAccount driverAccount);


        /// <summary>
        /// Oblicza sumaryczne koszty eksploatacji pojazdu.
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        public VehicleSummaryCosts CalculateVehicleSummaryCosts(Vehicle vehicle);
     
        /// <summary>
        /// Oblicza sumaryczne statystyki danego pojazdu. 
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        public VehicleStatistics CalculateVehicleSummaryStatistics(Vehicle vehicle);
    }
}
