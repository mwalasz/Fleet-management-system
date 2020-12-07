using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using System.Collections.Generic;

namespace FleetManagement.Entities.Accounts.UserAccounts
{
    public interface IUserAccountProvider : IBaseOperations<UserAccount>, IUserAccountsOperations<UserAccount>
    {
        public bool UpdateCredentials(string mail, string password);
        public bool UpdateAvailability(IEnumerable<string> emails, bool isActive);
        public bool UpdateAvailability(IEnumerable<int> ids, bool isActive);
    }
}
