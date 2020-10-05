using FleetManagement.Entities.UserAccounts.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Extensions
{
    public static class HttpContextExtensions
    {
        public async static Task SignInAsync(this HttpContext httpContext, UserAccount user)
        {
            await httpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                user.CreateAndGetClaims(),
                new AuthenticationProperties
                {
                    IsPersistent = true,
                    AllowRefresh = true,
                }
            );
        }

        public static bool IsUserLoggedIn(this HttpContext httpContext)
        {
            return !string.IsNullOrEmpty(httpContext.User?.Identity?.Name);
        }

        public static string GetName(this HttpContext httpContext)
        {
            return httpContext.User.Identity.Name;
        }
    }
}
