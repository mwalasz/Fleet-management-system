using FleetManagement.Authentication.Models;
using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.UserAccounts.Models;

namespace FleetManagement.Entities.Accounts.UserAccounts
{
    public interface IUserAccountProvider : IBaseOperations<UserAccount>, IUserAccountsOperations<UserAccount>
    {
        public void UpdateCredentials(string mail, string password);
    }
}
