using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AuthenticationController : ControllerBase
    {
        public AuthenticationController()
        {

        }

        [HttpGet]
        public string Test()
        {
            return "Hello World!";
        }

        [HttpPost]
        public string LogIn([FromQuery] string login, string password)
        {
            return "";
        }

        [HttpPost]
        public string LogOut()
        {
            return "";
        }
    }
}
