using FleetManagement.Statistics.Models.Drivers;

namespace FleetManagement.Statistics.Models
{
    public class CombinedDriverStatistics
    {
        public DriverStatistics DriverData { get; set; }
        public ChartSummaryDataPerVehicle PerVehicleData { get; set; }
    }
}
