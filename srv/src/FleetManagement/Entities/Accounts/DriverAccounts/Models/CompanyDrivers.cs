using FleetManagement.Entities.Accounts.DriverAccounts.DTO;
using System.Collections.Generic;

namespace FleetManagement.Entities.Accounts.DriverAccounts.Models
{
    public class CompanyDrivers
    {
        public List<DriverAccountBasicInfoDto> Employed { get; set; }
        public List<DriverAccountBasicInfoDto> Unemployed { get; set; }
    }
}
