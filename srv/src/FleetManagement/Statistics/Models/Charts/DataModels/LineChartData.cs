namespace FleetManagement.Statistics.Models.Charts.DataModels
{
    /// <summary>
    /// Opisuje dane do wykresu liniowego prezentującego wydatki w danym miesiącu.
    /// </summary>
    public class LineChartData
    {
        public string Name { get; set; } //month
        public double Sum { get; set; }
        public double Maintenances { get; set; }
        public double Fuel { get; set; }
    }
}
