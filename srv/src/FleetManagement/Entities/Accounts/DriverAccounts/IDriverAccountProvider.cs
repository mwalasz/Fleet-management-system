using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Companies.Models;
using System.Collections.Generic;

namespace FleetManagement.Entities.Accounts.DriverAccounts
{
    public interface IDriverAccountProvider : IBaseOperations<DriverAccount>, IUserAccountsOperations<DriverAccount>
    {
        /// <summary>
        /// Zwraca przedsiębiorstwo w którym pracuje kierowca.
        /// </summary>
        /// <param name="driverMail">Mail kierowcy.</param>
        /// <returns></returns>
        public Company GetDriverCompany(string driverMail);

        /// <summary>
        /// Zwraca wszystkich kierowców, którzy nie są przypisani do żadnej firmy.
        /// </summary>
        /// <returns></returns>
        public List<DriverAccount> GetUnemployedDrivers();

        /// <summary>
        /// Zwraca konta użytkowników z listy podanych maili.
        /// </summary>
        /// <param name="mails"></param>
        /// <returns></returns>
        public List<DriverAccount> GetDriversFromMailList(IEnumerable<string> mails);

        /// <summary>
        /// Usuwa przypisane pojazdy nowym kierowcom.
        /// </summary>
        /// <param name="newDrivers">Lista z wszystkimi kierowcami, którzy mają zostać zatrudnieni</param>
        /// <param name="oldDrivers">Lista z kierowcami, którzy byli już wcześniej zatrudnieni</param>
        /// <returns></returns>
        public List<DriverAccount> RemoveVehiclesFromNewDrivers(List<DriverAccountBasicInfoDto> oldDrivers, List<DriverAccount> newDrivers);
    }
}
