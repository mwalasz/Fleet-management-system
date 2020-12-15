using FleetManagement.Statistics.Models.Charts.DataModels;
using FleetManagement.Statistics.Models.Charts.DataModels.BarChart;
using System.Collections.Generic;

namespace FleetManagement.Statistics.Models.Drivers
{
    public class ChartSummaryDataPerVehicle
    {
        public List<PieChartData> Duration { get; set; }
        public List<PieChartData> Distance { get; set; }
        public List<BarChartSpeedData> Speed { get; set; }
    }
}
