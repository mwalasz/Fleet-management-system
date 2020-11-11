using FleetManagement.Entities.Accounts.UserAccounts.DTO;

namespace FleetManagement.Authentication.Models.Results
{
    public class AuthenticationResultDto
    {
        public UserAccountDto UserAccount { get; set; }
        public string Token { get; set; }
    }
}
