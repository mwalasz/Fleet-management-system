﻿using FleetManagement.Entities.Accounts.UserAccounts.Models;
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

        /// <summary>
        /// Tworzy claimsy dla użytkownika na podstawie jego danych.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static ClaimsPrincipal CreateAndGetClaims(this UserAccount user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.LastName),
                new Claim(ClaimTypes.Role, user.Role),
            };

            return new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));
        }
    }
}
