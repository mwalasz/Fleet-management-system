using System;

namespace FleetManagement.Entities.Maintenances.Models
{
    public class MaintenanceDto
    {
        public DateTime Date { get; set; }
        public int OdometerMileage { get; set; }
        public double Cost { get; set; }
        public string UsedParts { get; set; }
        public string Description { get; set; }
        public string MaintenanceProviderDescription { get; set; }
    }
}
