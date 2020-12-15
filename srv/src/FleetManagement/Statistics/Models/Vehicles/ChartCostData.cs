using FleetManagement.Statistics.Models.Charts.DataModels;
using FleetManagement.Statistics.Models.Charts.DataModels.LineChart;
using System.Collections.Generic;

namespace FleetManagement.Statistics.Models.Vehicles
{
    public class ChartCostData
    {
        /// <summary>
        /// Podsumowanie miesięczne dla sumy, tankowań oraz napraw.
        /// </summary>
        public List<LineChartCostData> Summary { get; set; }
        
        /// <summary>
        /// Stosunek kosztów poniesionych na tankowania i naprawy.
        /// </summary>
        public List<PieChartData> Ratio { get; set; }
    }
}
