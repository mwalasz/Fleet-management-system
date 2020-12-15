using FleetManagement.Statistics.Models.Charts.DataModels;
using FleetManagement.Statistics.Models.Charts.DataModels.BarChart;
using System.Collections.Generic;

namespace FleetManagement.Statistics.Models.Vehicles
{
    public class ChartSummaryDataPerDriver
    {
        /// <summary>
        /// Czas wykorzystania pojazdu na każdego kierowcę.
        /// </summary>
        public List<PieChartData> Duration { get; set; }

        /// <summary>
        /// Dystans przejechany pojazdem na każdego kierowcę.
        /// </summary>
        public List<PieChartData> Distance { get; set; }

        /// <summary>
        /// Liczba wykorzystań pojazdu przez każdego kierowcę.
        /// </summary>
        public List<BarChartData> Usages { get; set; }
    }
}
