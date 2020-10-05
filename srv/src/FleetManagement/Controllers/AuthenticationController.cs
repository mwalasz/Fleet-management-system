using FleetManagement.Authentication;
using FleetManagement.Extensions;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthenticationController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost]
        public async Task<string> LogIn([FromQuery] string mail, string password)
        {
            var user = authService.ReturnValidUser(mail, password);

            if (user == null)
                return "niepoprawny login lub hasło!";

            await HttpContext.SignInAsync(user);

            return $"Witaj {user.FirstName}!";
        }

        [HttpPost]
        public async Task<string> LogOut()
        {
            if (!HttpContext.IsUserLoggedIn())
                return "Niepoprawny użytkownik!";

            await HttpContext.SignOutAsync();
            return "Żegnaj!";
        }
    }
}
