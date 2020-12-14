using System;

namespace FleetManagement.Entities.Refuelings.Params
{
    public class NewRefuelingParams
    {
        public string Vin { get; set; }
        public string PlaceDescription { get; set; }
        public DateTime Time { get; set; }
        public int OdometerMileage { get; set; }
        public double Cost { get; set; }
        public double Liters { get; set; }
        public double CostPerLiter { get; set; }
    }
}
