using AutoMapper;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.DTO;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using FleetManagement.Utils;
using FleetManagement.Images;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous]
    //[Authorize(Roles = Roles.Admin)]
    public class UsersController : ControllerBase
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IMapper mapper;
        private readonly IImagesService imagesService;

        public UsersController(IUserAccountProvider userAccountProvider,
            IMapper mapper, IImagesService imagesService)
        {
            this.userAccountProvider = userAccountProvider;
            this.mapper = mapper;
            this.imagesService = imagesService;
        }

        [HttpGet]
        public IEnumerable<UserAccountDto> GetAll(bool activeUsers)
        {
            return userAccountProvider.GetAll()
                .Where(user => user.IsActive == activeUsers)
                .Select(user => mapper.Map<UserAccount, UserAccountDto>(user));
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

            var success = userAccountProvider.UpdateAvailability(emails, isActive);

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
