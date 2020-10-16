using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.ManagerAccounts.Models;

namespace FleetManagement.Entities.Accounts.ManagerAccounts
{
    public interface IManagerAccountProvider : IBaseOperations<ManagerAccount>, IUserAccountsOperations<ManagerAccount>
    {
    }
}
