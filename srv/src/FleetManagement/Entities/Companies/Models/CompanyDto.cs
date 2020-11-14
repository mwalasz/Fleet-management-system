using FleetManagement.Entities.Accounts.ManagerAccounts.DTO;

namespace FleetManagement.Entities.Companies.Models
{
    public class CompanyDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string NIP { get; set; }
        public string Address { get; set; }
        public string Mail { get; set; }
        public string PhoneNumber { get; set; }
        public ManagerAccountDto ManagerAccount { get; set; }
    }
}
