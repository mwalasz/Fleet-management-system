namespace FleetManagement.Statistics.Models.Charts.DataModels.LineChart
{
    /// <summary>
    /// Opisuje dane do wykresu liniowego prezentującego wydatki w danym miesiącu.
    /// </summary>
    public class LineChartCostData
    {
        public string Name { get; set; } //month
        public double Sum { get; set; }
        public double Maintenances { get; set; }
        public double Fuel { get; set; }
    }
}
