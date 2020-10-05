using FleetManagement.Entities.UserAccounts.Models;
using FleetManagement.Exceptions;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace FleetManagement.Extensions
{
    public static class ClaimsExtensions
    {
        public static int GetUserId(this ClaimsPrincipal claimsPrincipal)
            => int.TryParse(claimsPrincipal?.Claims?.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value, out int id)
                ? id
                : throw new InvalidCookieException();


        public static ClaimsPrincipal CreateAndGetClaims(this UserAccount user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
            };

            return new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));
        }
    }
}
