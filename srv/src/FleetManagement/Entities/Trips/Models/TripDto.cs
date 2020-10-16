using FleetManagement.Entities.Accounts.DriverAccounts.DTO;

namespace FleetManagement.Entities.Trips.Models
{
    public class TripDto
    {
        public string StartPlace { get; set; }
        public string DestinationPlace { get; set; }
        public double Distance { get; set; }
        public double TravelTime { get; set; }
        public double AverageSpeed { get; set; }
        public DriverAccountDto DriverAccount { get; set; }
    }
}
