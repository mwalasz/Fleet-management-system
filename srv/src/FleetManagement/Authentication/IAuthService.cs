using FleetManagement.Entities.Accounts.UserAccounts.Models;

namespace FleetManagement.Authentication
{
    public interface IAuthService
    {
        /// <summary>
        /// Zwraca istniejącego użytkownika po podaniu prawidłowego hasła.
        /// </summary>
        /// <param name="mail">mail identyfikujący użytkownika</param>
        /// <param name="password">hasło</param>
        /// <returns></returns>
        UserAccount ReturnValidUser(string mail, string password);
    }
}