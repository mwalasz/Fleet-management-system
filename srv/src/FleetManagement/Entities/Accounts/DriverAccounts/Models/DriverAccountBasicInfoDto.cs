using FleetManagement.Entities.Accounts.UserAccounts.DTO;

namespace FleetManagement.Entities.Accounts.DriverAccounts.Models
{
    public class DriverAccountBasicInfoDto : EntityBase
    {
        public UserAccountDto Account { get; set; }
        public string DrivingLicenseNumber { get; set; }
    }
}
