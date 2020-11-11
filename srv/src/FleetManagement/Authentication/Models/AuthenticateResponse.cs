using FleetManagement.Entities.Accounts.UserAccounts.Models;

namespace FleetManagement.Authentication.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(UserAccount user, string token)
        {
            Id = user.Id;
            Email = user.Email;
            LastName = user.LastName;
            FirstName = user.FirstName;
            Token = token;
        }
    }
}
