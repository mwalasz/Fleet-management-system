using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Companies.Models;
using System.Collections.Generic;

namespace FleetManagement.Entities.Companies
{
    public interface ICompanyProvider : IBaseOperations<Company>
    {
        public Company GetByNip(string nip);
        public bool CheckIfThisNipAlreadyExists(string nip);
        public bool CheckIfThisNameAlreadyExists(string name);
        public bool CheckIfThisMailAlreadyExists(string mail);

        /// <summary>
        /// Aktualizuje listę kierowców zatrudnionych w przedsiębiorstwie.
        /// </summary>
        /// <param name="update"></param>
        /// <returns></returns>
        public bool UpdateDriversList(string nip, IEnumerable<DriverAccount> drivers);
    }
}
