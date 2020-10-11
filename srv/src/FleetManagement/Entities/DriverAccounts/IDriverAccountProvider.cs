using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.DriverAccounts.Models;
using FleetManagement.Entities.DriverAccounts.Params;

namespace FleetManagement.Entities.DriverAccounts
{
    public interface IDriverAccountProvider : IBaseOperations<DriverAccount>, IUserAccountsOperations<DriverAccount>
    {
    }
}
