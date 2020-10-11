using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.ManagerAccounts.Models;
using FleetManagement.Entities.ManagerAccounts.Params;
using FleetManagement.Entities.UserAccounts;

namespace FleetManagement.Entities.ManagerAccounts
{
    public interface IManagerAccountProvider : IBaseOperations<ManagerAccount>, IUserAccountsOperations<ManagerAccount>
    {
    }
}
