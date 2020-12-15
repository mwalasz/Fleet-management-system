using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Statistics.Models.Charts.DataModels;
using FleetManagement.Statistics.Models.Charts.DataModels.BarChart;
using FleetManagement.Statistics.Models.Charts.DataModels.LineChart;
using System.Collections.Generic;

namespace FleetManagement.Statistics
{
    public interface IChartsService
    {
        #region Driver

        /// <summary>
        /// Oblicza dane do wykresu prezentującego sumaryczny dystans przejechany każdym pojazdem.
        /// </summary>
        /// <param name="driverAccount"></param>
        /// <returns></returns>
        public List<PieChartData> GetSummaryDistancePerVehicle(DriverAccount driverAccount);

        /// <summary>
        /// Oblicza dane do wykresu prezentującego sumaryczny czas jazdy każdym pojazdem.
        /// </summary>
        /// <param name="driverAccount"></param>
        /// <returns></returns>
        public List<PieChartData> GetSummaryDurationPerVehicle(DriverAccount driverAccount);

        /// <summary>
        /// Oblicza dane do wykresu prezentującego maksymalne i średnie prędkości dla każdego pojazdu.
        /// </summary>
        /// <param name="driverAccount"></param>
        /// <returns></returns>
        public List<BarChartSpeedData> GetSpeedsPerVehicle(DriverAccount driverAccount);

        #endregion

        #region Vehicle

        #region Costs

        /// <summary>
        /// Oblicza stosunek kosztów poniesionych na tankowania i naprawy.
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        public List<PieChartData> GetCostRatio(Vehicle vehicle);

        /// <summary>
        /// Oblicza miesięczną sumę kosztów.
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        public List<LineChartCostData> GetCostMonthlySummary(Vehicle vehicle);

        #endregion

        #region Driving

        #endregion

        #endregion
    }
}
