using FleetManagement.Entities.Accounts.DriverAccounts.Models;

namespace FleetManagement.Statistics
{
    public interface IStatisticsService
    {
        public void CalculateDriverStatistics(DriverAccount driverAccount);
    }
}
