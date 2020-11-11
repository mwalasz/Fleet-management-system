using FleetManagement.Entities.Accounts.UserAccounts.Models;

namespace FleetManagement.Authentication.Models.Results
{
    public class AuthenticationResult
    {
        public UserAccount UserAccount { get; set; }
        public string Token { get; set; }
    }
}
