using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.ManagerAccounts.Models;
using FleetManagement.Entities.Companies.Models;

namespace FleetManagement.Entities.Accounts.ManagerAccounts
{
    public interface IManagerAccountProvider : IBaseOperations<ManagerAccount>, IUserAccountsOperations<ManagerAccount>
    {
        /// <summary>
        /// Zwraca przedsiębiorstwo, w którym pracuje.
        /// </summary>
        /// <param name="mail"></param>
        /// <returns></returns>
        public Company GetCompany(string mail);
    }
}
