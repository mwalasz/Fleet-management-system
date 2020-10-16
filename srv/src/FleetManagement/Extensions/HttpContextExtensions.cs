using FleetManagement.Entities.Accounts.UserAccounts.Models;
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

        /// <summary>
        /// Sprawdza, czy jakiś użytkownik jest zalogowany.
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        public static bool IsUserLoggedIn(this HttpContext httpContext)
        {
            return !string.IsNullOrEmpty(httpContext.User?.Identity?.Name);
        }

        /// <summary>
        /// Zwraca nazwę użytkownika z kontekstu.
        /// </summary>
        /// <param name="httpContext"></param>
        /// <returns></returns>
        public static string GetUserName(this HttpContext httpContext)
        {
            return httpContext.User.Identity.Name;
        }
    }
}
