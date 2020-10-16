using FleetManagement.Entities.Accounts.UserAccounts.DTO;

namespace FleetManagement.Entities.Accounts.DriverAccounts.DTO
{
    public class DriverAccountDto
    {
        public UserAccountDto Account { get; set; }
        public string DrivingLicenseNumber { get; set; }
        public string Vehicles { get; set; }
    }
}
