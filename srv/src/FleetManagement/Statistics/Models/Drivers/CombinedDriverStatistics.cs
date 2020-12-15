using FleetManagement.Statistics.Models.Drivers;

namespace FleetManagement.Statistics.Models
{
    public class CombinedDriverStatistics
    {
        /// <summary>
        /// Statystyki.
        /// </summary>
        public DriverStatistics DriverData { get; set; }

        /// <summary>
        /// Dane do wykresów.
        /// </summary>
        public ChartSummaryDataPerVehicle PerVehicleData { get; set; }
    }
}
