using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.ManagerAccounts.Models;

namespace FleetManagement.Entities.ManagerAccounts
{
    public interface IManagerAccountProvider : IBaseOperations<ManagerAccount>, IUserAccountsOperations<ManagerAccount>
    {
        
    }
}
