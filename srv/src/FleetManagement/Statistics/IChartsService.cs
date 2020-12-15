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
        public List<LineChartCostData> GetMonthlyCostSummary(Vehicle vehicle);

        #endregion

        #region Driving

        /// <summary>
        /// Oblicza dane do wykresu prezentującego sumaryczny dystans przejechany przez kierowców pojazdem.
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        public List<PieChartData> GetSummaryDistancePerDriver(Vehicle vehicle);

        /// <summary>
        /// Oblicza dane do wykresu prezentującego sumaryczny czas użytku pojazdu przez kierowców.
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        public List<PieChartData> GetSummaryDurationPerDriver(Vehicle vehicle);

        /// <summary>
        /// Oblicza dane do wykresu prezentujacego ilość użyć danego pojazdu przez kierowców.
        /// </summary>
        /// <param name="vehicle"></param>
        /// <returns></returns>
        public List<BarChartData> GetUsagesPerDriver(Vehicle vehicle);

        #endregion

        #endregion
    }
}
