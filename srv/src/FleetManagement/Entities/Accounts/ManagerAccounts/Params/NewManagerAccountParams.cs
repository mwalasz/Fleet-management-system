using FleetManagement.Entities.Accounts.UserAccounts;

namespace FleetManagement.Entities.Accounts.ManagerAccounts.Params
{
    public class NewManagerAccountParams : INewAccountParams
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string AvatarImageBase64 { get; set; }
    }
}
