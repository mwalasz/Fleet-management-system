using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.ManagerAccounts.DTO;
using System.Collections.Generic;

namespace FleetManagement.Entities.Companies.Models
{
    public class CompanyDto : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string NIP { get; set; }
        public string Address { get; set; }
        public string Mail { get; set; }
        public string PhoneNumber { get; set; }
        public ManagerAccountDto ManagerAccount { get; set; }
        public List<DriverAccountBasicInfoDto> Drivers { get; set; }
    }
}
