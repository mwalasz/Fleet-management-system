using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Statistics.Models.Charts.DataModels;
using System.Collections.Generic;

namespace FleetManagement.Statistics
{
    public interface IChartsService
    {
        /// <summary>
        /// Oblicza dane do wykresu prezentującego sumaryczny dystans przejechany każdym pojazdem.
        /// </summary>
        /// <param name="driverAccount"></param>
        /// <returns></returns>
        public List<PieChartData> CalculateSummaryDistancePerVehicle(DriverAccount driverAccount);

        /// <summary>
        /// Oblicza dane do wykresu prezentującego sumaryczny czas jazdy każdym pojazdem.
        /// </summary>
        /// <param name="driverAccount"></param>
        /// <returns></returns>
        public List<PieChartData> CalculateSummaryDurationPerVehicle(DriverAccount driverAccount);

        /// <summary>
        /// Oblicza dane do wykresu prezentującego maksymalne i średnie prędkości dla każdego pojazdu.
        /// </summary>
        /// <param name="driverAccount"></param>
        /// <returns></returns>
        public List<BarChartSpeedData> CalculateSpeedsPerVehicle(DriverAccount driverAccount);
    }
}
