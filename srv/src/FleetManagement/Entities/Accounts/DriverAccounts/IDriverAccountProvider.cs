using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;

namespace FleetManagement.Entities.Accounts.DriverAccounts
{
    public interface IDriverAccountProvider : IBaseOperations<DriverAccount>, IUserAccountsOperations<DriverAccount>
    {
    }
}
