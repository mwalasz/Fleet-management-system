using AutoMapper;
using FleetManagement.Authentication.Policies;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.DTO;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using FleetManagement.Utils;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [Authorize(Roles = Roles.Admin)]
    public class UsersController : ControllerBase
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IMapper mapper;

        public UsersController(IUserAccountProvider userAccountProvider,
            IMapper mapper)
        {
            this.userAccountProvider = userAccountProvider;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<UserAccountDto> GetAll(bool onlyActiveUsers = false)
        {
            if (onlyActiveUsers)
            {
                return userAccountProvider.GetAll()
                    .Where(user => user.IsActive)
                    .Select(user => mapper.Map<UserAccount, UserAccountDto>(user));
            }
            else
            {
                return userAccountProvider.GetAll()
                    .Select(user => mapper.Map<UserAccount, UserAccountDto>(user));
            }
        }

        /// <summary>
        /// Zmienia dostępność konta użytkownika. Domyślnie dezaktywuje konto.
        /// </summary>
        /// <param name="ids">Lista kont do dezaktywacji.</param>
        /// <param name="isActive">Czy konta mają być aktywne, czy nie.</param>
        [HttpPut]
        public IActionResult ChangeAvailability(IEnumerable<string> emails, bool isActive = false)
        {
            var users = userAccountProvider.GetAll()
                .Where(user => emails.Contains(user.Email));

            if (users.Count().Equals(0))
                return NotFound("Nie znaleziono podanych użytkowników.");

            foreach (var user in users)
            {
                user.IsActive = isActive;
                userAccountProvider.Update(user);
            }

            return Ok("Pomyślnie zaktualizowano dostępność podanych użytkowników.");
        }

        [HttpPut]
        public IActionResult UpdatePassword(string mail, string password)
        {
            return userAccountProvider.UpdateCredentials(mail, password)
                ? Ok("Pomyślnie zaktualizowano hasło użytkownika.")
                : Ok("Nie udało się zaktualizować hasła.");
        }
    }
}
