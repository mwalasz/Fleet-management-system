namespace FleetManagement.Statistics.Models.Vehicles
{
    /// <summary>
    /// Statystyki na temat pojazdu.
    /// </summary>
    public class CombinedVehicleStatistics
    {
        public CostsData Costs { get; set; }
        public DrivingData Driving { get; set; }
    }

    /// <summary>
    /// Koszty.
    /// </summary>
     public class CostsData
    {
        /// <summary>
        /// Statystyki kosztów.
        /// </summary>
        public VehicleSummaryCosts Data { get; set; }

        /// <summary>
        /// Dane do wykresów.
        /// </summary>
        public ChartCostData Charts { get; set; }
    }

    /// <summary>
    /// Eksploatacja.
    /// </summary>
    public class DrivingData
    {
        /// <summary>
        /// Statystyki eksploatacji.
        /// </summary>
        public VehicleStatistics Data { get; set; }

        /// <summary>
        /// Dane do wykresów.
        /// </summary>
        public ChartSummaryDataPerDriver Charts { get; set; }
    }
}
