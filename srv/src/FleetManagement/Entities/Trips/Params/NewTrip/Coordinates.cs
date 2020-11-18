using System;

namespace FleetManagement.Entities.Trips.Params.NewTrip
{
    [Serializable]
    public class Coordinates
    {
        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}
