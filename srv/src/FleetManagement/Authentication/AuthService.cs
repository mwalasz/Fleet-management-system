using FleetManagement.Authentication.Hashes;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IHashService hashService;

        public AuthService(IUserAccountProvider userAccountProvider, IHashService hashService)
        {
            this.userAccountProvider = userAccountProvider;
            this.hashService = hashService;
        }

        public UserAccount ReturnValidUser(string mail, string password)
        {
            var user = userAccountProvider.GetByMail(mail);

            if (user == null)
                return null;

            return hashService.CompareHashes(password, user.PasswordHash) ? user : null;
        }
    }
}
