using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using System;
using System.Collections.Generic;

namespace FleetManagement.Entities.Trips.Models
{
    public class TripDto : EntityBase
    {
        public List<CoordinatesDto> LocationHistory { get; set; }
        public string StartPlace { get; set; }
        public DateTime StartTime { get; set; }
        public string DestinationPlace { get; set; }
        public DateTime DestinationArrivalTime { get; set; }
        public double Distance { get; set; }
        public double TravelTime { get; set; }
        public double AverageSpeed { get; set; }
        public double MaximumSpeed { get; set; }
        public DriverTripInfoDto DriverAccount { get; set; }
    }
}
