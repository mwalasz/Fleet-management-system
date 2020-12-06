using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Statistics.Models;
using FleetManagement.Statistics.Models.Charts;
using System.Collections.Generic;

namespace FleetManagement.Statistics
{
    public interface IStatisticsService
    {
        public DriverStatistics CalculateDriverStatistics(DriverAccount driverAccount);

        public List<ChartData> CalculateSummaryDistancePerVehicle(DriverAccount driverAccount);

        public List<ChartData> CalculateSummaryDurationPerVehicle(DriverAccount driverAccount);
    }
}
