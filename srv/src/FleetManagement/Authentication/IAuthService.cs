using FleetManagement.Authentication.Models;
using FleetManagement.Authentication.Models.Results;
using FleetManagement.Entities.Accounts.UserAccounts.Models;

namespace FleetManagement.Authentication
{
    public interface IAuthService
    {
        public AuthenticationResult Authenticate(AuthenticationParams model);

        public string GenerateToken(UserAccount user);

        public UserAccount ValidateToken(string token);
    }
}