using FleetManagement.Entities.UserAccounts.DTO;

namespace FleetManagement.Entities.DriverAccounts.DTO
{
    public class DriverAccountDto
    {
        public UserAccountDto Account { get; set; }
        public string DrivingLicenseNumber { get; set; }
        public string Vehicles { get; set; }
    }
}
