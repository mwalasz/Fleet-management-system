using AutoMapper;
using AutoWrapper.Wrappers;
using FleetManagement.Authentication.Policies;
using FleetManagement.Entities.DriverAccounts;
using FleetManagement.Entities.DriverAccounts.DTO;
using FleetManagement.Entities.DriverAccounts.Models;
using FleetManagement.Entities.DriverAccounts.Params;
using FleetManagement.Entities.ManagerAccounts;
using FleetManagement.Entities.ManagerAccounts.DTO;
using FleetManagement.Entities.ManagerAccounts.Models;
using FleetManagement.Entities.ManagerAccounts.Params;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.DTO;
using FleetManagement.Entities.UserAccounts.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [Authorize(Policy = Policy.AdminsAcces)]
    public class UserAccountsController : ControllerBase
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IManagerAccountProvider managerAccountProvider;
        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly IMapper mapper;

        public UserAccountsController(IUserAccountProvider userAccountProvider,
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
        public IEnumerable<UserAccountDto> GetAllUserAccounts(bool onlyActiveUsers = false)
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
        public IEnumerable<ManagerAccountDto> GetAllManagersAccounts()
        {
            return managerAccountProvider.GetAll()
                .Select(manager => mapper.Map<ManagerAccount, ManagerAccountDto>(manager));
        }

        [HttpGet]
        public IEnumerable<DriverAccountDto> GetAllDriversAccounts()
        {
            return driverAccountProvider.GetAll()
                .Select(driver => mapper.Map<DriverAccount, DriverAccountDto>(driver));
        }

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
        public async Task<ApiResponse> ChangeUserAvailability(IEnumerable<int> ids, bool isActive = false)
        {
            var users = userAccountProvider.GetAll().
                Where(user => ids.Contains(user.Id));

            if (users.Count().Equals(0))
                return new ApiResponse("Nie znaleziono podanych użytkowników.", 204);

            foreach (var user in users)
            {
                user.IsActive = isActive;
                userAccountProvider.Update(user);
            }

            return new ApiResponse("Pomyślnie zaktualizowano dostępność podanych użytkowników.", 200);
        }

        [HttpPut]
        public async Task<ApiResponse> UpdateUserPassword(string mail, string password)
        {
            try
            {
                userAccountProvider.UpdateCredentials(mail, password);

                return new ApiResponse("Pomyślnie zaktualizowano hasło użytkownika.", 200);
            }
            catch (Exception e)
            {
                return new ApiResponse($"Nie udało się zaktualizować hasła z powodu: {e.Message}", 204);
            }
        }
    }
}
