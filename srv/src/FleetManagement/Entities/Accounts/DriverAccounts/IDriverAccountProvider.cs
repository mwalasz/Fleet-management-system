using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Companies.Models;

namespace FleetManagement.Entities.Accounts.DriverAccounts
{
    public interface IDriverAccountProvider : IBaseOperations<DriverAccount>, IUserAccountsOperations<DriverAccount>
    {
        public Company GetDriverCompany(string driverMail);
    }
}
