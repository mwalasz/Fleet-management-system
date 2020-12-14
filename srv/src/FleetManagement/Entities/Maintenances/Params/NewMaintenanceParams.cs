using System;

namespace FleetManagement.Entities.Maintenances.Params
{
    public class NewMaintenanceParams
    {
        public string Vin { get; set; }
        public DateTime Date { get; set; }
        public int OdometerMileage { get; set; }
        public double Cost { get; set; }
        public string UsedParts { get; set; }
        public string Description { get; set; }
        public string ProviderDescription { get; set; }
    }
}
