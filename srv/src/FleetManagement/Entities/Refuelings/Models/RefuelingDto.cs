using System;

namespace FleetManagement.Entities.Refuelings.Models
{
    public class RefuelingDto
    {
        public DateTime Time { get; set; }
        public string PlaceDescription { get; set; }
        public double Cost { get; set; }
        public double Liters { get; set; }
        public double CostPerLiter { get; set; }
    }
}
