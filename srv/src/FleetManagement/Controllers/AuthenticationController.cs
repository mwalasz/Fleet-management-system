using AutoWrapper.Wrappers;
using FleetManagement.Authentication;
using FleetManagement.Extensions;
using FleetManagement.ResponseWrapper;
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
        public async Task<ApiResponse> LogIn([FromQuery] string mail, string password)
        {
            var user = authService.ReturnValidUser(mail, password);

            if (user == null)
                return Responses.AboutUserEvents(ResponseType.User.NotFound);

            await HttpContext.SignInAsync(user);
            return Responses.AboutUserEvents(ResponseType.User.SignedIn);
        }

        [HttpPost]
        public async Task<ApiResponse> LogOut()
        {
            if (!HttpContext.IsUserLoggedIn())
                return Responses.AboutUserEvents(ResponseType.User.NotLogged);

            await HttpContext.SignOutAsync();
            return Responses.AboutUserEvents(ResponseType.User.SignedOut);
        }
    }
}
