using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using System;

namespace FleetManagement.Entities.Trips.Models
{
    public class TripDto
    {
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
