using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Statistics.Models;
using FleetManagement.Statistics.Models.Charts.DataModels;
using System.Collections.Generic;

namespace FleetManagement.Statistics
{
    public interface IStatisticsService
    {
        public DriverStatistics CalculateDriverStatistics(DriverAccount driverAccount);

        public List<PieChartData> CalculateSummaryDistancePerVehicle(DriverAccount driverAccount);

        public List<PieChartData> CalculateSummaryDurationPerVehicle(DriverAccount driverAccount);

        public List<BarChartSpeedData> CalculateSpeedsPerVehicle(DriverAccount driverAccount);
    }
}
