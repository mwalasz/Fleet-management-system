using System;

namespace FleetManagement.Entities.Trips.Params.NewTrip
{
    public class NewTripParams
    {
        public string UserMail { get; set; }

        public string VehicleVinNumber { get; set; }

        public Coordinates[] LocationHistory { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public double TravelTime { get; set; }

        public double Distance { get; set; }

        public double AverageSpeed { get; set; }

        public double MaximumSpeed { get; set; }
    }
}
