using AutoWrapper.Wrappers;
using FleetManagement.Authentication;
using FleetManagement.Authentication.Models;
using FleetManagement.Extensions;
using FleetManagement.ResponseWrapper;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
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
        public async Task<IActionResult> LogIn([FromBody] AuthenticateRequest args)
        {
            var user = authService.Authenticate(args);

            if (user == null)
                return NotFound("No user found!");

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> VerifyToken([FromBody] TokenValidationParams args)
        {
            var user = authService.ValidateToken(args.Token);

            if (user == null)
                return Ok("Not valid token");

            return Ok(user);
        }

        public class TokenValidationParams
        {
            public string Token { get; set; }
        }
    }
}
