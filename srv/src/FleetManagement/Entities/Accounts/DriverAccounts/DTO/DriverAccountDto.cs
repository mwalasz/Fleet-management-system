using FleetManagement.Entities.Accounts.UserAccounts.DTO;
using FleetManagement.Entities.Vehicles.Models;
using System.Collections.Generic;

namespace FleetManagement.Entities.Accounts.DriverAccounts.DTO
{
    public class DriverAccountDto
    {
        public UserAccountDto Account { get; set; }
        public string DrivingLicenseNumber { get; set; }
        public List<VehicleBasicInfoDto> Vehicles { get; set; }
    }
}
