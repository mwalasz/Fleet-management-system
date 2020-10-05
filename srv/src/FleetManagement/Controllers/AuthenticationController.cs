using FleetManagement.Utils;
using Microsoft.AspNetCore.Mvc;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    public class AuthenticationController : ControllerBase
    {
        public AuthenticationController()
        {

        }

        [HttpPost]
        public string LogIn([FromQuery] string login, string password)
        {
            return $"Witaj {login}!";
        }

        [HttpPost]
        public string LogOut()
        {
            return "Żegnaj!";
        }
    }
}
