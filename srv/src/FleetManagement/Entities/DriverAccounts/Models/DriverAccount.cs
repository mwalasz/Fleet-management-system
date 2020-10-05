using FleetManagement.Entities.UserAccounts.Models;

namespace FleetManagement.Entities.DriverAccounts.Models
{
    public class DriverAccount : UserAccount
    {
        public string DrivingLicenseNumber { get; set; }

        //TODO: lista przydzielonych pojazdów
    }
}
