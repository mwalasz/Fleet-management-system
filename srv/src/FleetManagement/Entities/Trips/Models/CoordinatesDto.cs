using System;

namespace FleetManagement.Entities.Trips.Models
{
    [Serializable]
    public class CoordinatesDto
    {
        public double Lat { get; set; }
        public double Lng { get; set; }
    }
}
