using AutoMapper;
using AutoWrapper.Wrappers;
using FleetManagement.Authentication.Policies;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.DTO;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.DriverAccounts.Params;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Accounts.ManagerAccounts.DTO;
using FleetManagement.Entities.Accounts.ManagerAccounts.Models;
using FleetManagement.Entities.Accounts.ManagerAccounts.Params;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.DTO;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FleetManagement.Utils;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [Authorize(Roles = Roles.Admin)]
    public class UsersController : ControllerBase
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IManagerAccountProvider managerAccountProvider;
        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly IMapper mapper;

        public UsersController(IUserAccountProvider userAccountProvider,
            IManagerAccountProvider managerAccountProvider,
            IDriverAccountProvider driverAccountProvider,
            IMapper mapper)
        {
            this.userAccountProvider = userAccountProvider;
            this.managerAccountProvider = managerAccountProvider;
            this.driverAccountProvider = driverAccountProvider;
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

        [HttpGet]
        public IEnumerable<ManagerAccountDto> GetAllManagers()
        {
            return managerAccountProvider.GetAll()
                .Select(manager => mapper.Map<ManagerAccount, ManagerAccountDto>(manager));
        }

        [Authorize(Roles = CustomRoles.AdminAndManager)]
        [HttpGet]
        public IEnumerable<DriverAccountDto> GetAllDrivers()
        {
            return driverAccountProvider.GetAll()
                .Select(driver => mapper.Map<DriverAccount, DriverAccountDto>(driver));
        }

        [Authorize(Roles = CustomRoles.AdminAndManager)]
        [HttpPost]
        public async Task<ApiResponse> AddNewDriver([FromQuery] NewDriverAccountParams newDriverParams)
        {
            var newDriverId = driverAccountProvider.AddNewAndGetId(newDriverParams);
            
            if (newDriverId != -1)
            {
                var newDriver = driverAccountProvider.GetById(newDriverId);

                var toReturn = (newDriver != null)
                    ? mapper.Map<DriverAccount, DriverAccountDto>(newDriver)
                    : null;

                return new ApiResponse(toReturn);
            }

            return new ApiResponse("Błąd w trakcie dodawania nowego kierowcy!", null, 400);
        }

        [HttpPost]
        public async Task<ApiResponse> AddNewManager([FromQuery] NewManagerAccountParams newDriverParams)
        {
            var newManagerId = managerAccountProvider.AddNewAndGetId(newDriverParams);

            if (newManagerId != -1)
            {
                var newManager = managerAccountProvider.GetById(newManagerId);

                var toReturn = (newManager != null)
                    ? mapper.Map<ManagerAccount, ManagerAccountDto>(newManager)
                    : null;

                return new ApiResponse(toReturn);
            }

            return new ApiResponse("Błąd w trakcie dodawania nowego menadżera!", null, 400);
        }

        /// <summary>
        /// Zmienia dostępność konta użytkownika. Domyślnie dezaktywuje konto.
        /// </summary>
        /// <param name="ids">Lista kont do dezaktywacji.</param>
        /// <param name="isActive">Czy konta mają być aktywne, czy nie.</param>
        [HttpPut]
        public IActionResult ChangeAvailability(IEnumerable<int> ids, bool isActive = false)
        {
            var users = userAccountProvider.GetAll().
                Where(user => ids.Contains(user.Id));

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
