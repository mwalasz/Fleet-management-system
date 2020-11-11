using FleetManagement.Authentication.Models;
using FleetManagement.Entities.Accounts.UserAccounts.Models;

namespace FleetManagement.Authentication
{
    public interface IAuthService
    {
        public AuthenticateResponse Authenticate(AuthenticateRequest model);

        public string GenerateToken(UserAccount user);

        public UserAccount ValidateToken(string token);
    }
}