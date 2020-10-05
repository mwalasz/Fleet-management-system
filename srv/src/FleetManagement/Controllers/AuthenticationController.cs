using Microsoft.AspNetCore.Mvc;

namespace FleetManagement.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
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
