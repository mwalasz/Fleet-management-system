using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Statistics.Models;

namespace FleetManagement.Statistics
{
    public interface IStatisticsService
    {
        public DriverStatistics CalculateDriverStatistics(DriverAccount driverAccount);
    }
}
