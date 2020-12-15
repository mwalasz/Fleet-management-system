namespace FleetManagement.Statistics.Models.Vehicles
{
    public class VehicleSummaryCosts
    {
        public double TotalCost { get; set; }

        public double MaintenancesCost { get; set; }
        public double MaintenancesAverageCost { get; set; }
        public int MaintenancesNumber { get; set; }
        
        public double RefuelingsCost { get; set; }
        public double RefuelingsAverageCost { get; set; }
        public int RefuelingsNumber { get; set; }
    }
}
