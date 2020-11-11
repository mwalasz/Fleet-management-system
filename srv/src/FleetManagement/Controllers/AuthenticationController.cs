using AutoMapper;
using FleetManagement.Authentication;
using FleetManagement.Authentication.Models;
using FleetManagement.Authentication.Models.Results;
using FleetManagement.Authentication.Tokens;
using FleetManagement.Entities.Accounts.UserAccounts.DTO;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly IMapper mapper;

        public AuthenticationController(IAuthService authService, 
            IMapper mapper)
        {
            this.authService = authService;
            this.mapper = mapper;
        }

        [HttpPost]
        public IActionResult Login([FromBody] AuthenticationParams args)
        {
            var result = authService.Authenticate(args);

            if (result == null)
                return NotFound("User not found!");

            return Ok(mapper.Map<AuthenticationResult, AuthenticationResultDto>(result));
        }

        [HttpPost]
        public IActionResult VerifyToken([FromBody] TokenValidationParams args)
        {
            var user = authService.ValidateToken(args.Token);

            if (user == null)
                return Ok("Token is not valid.");

            return Ok(mapper.Map<UserAccount, UserAccountDto>(user));
        }
    }
}
