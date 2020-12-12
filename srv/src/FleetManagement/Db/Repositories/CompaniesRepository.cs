using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using NHibernate;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class CompaniesRepository : DbBasicOperations<Company>, ICompanyProvider
    {
        private readonly ISessionFactory sessionFactory;

        public CompaniesRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }

        public bool CheckIfThisNameAlreadyExists(string name)
        {
            return GetAll()
                    .Where(x => x.Name.Equals(name))
                    .Count() != 0;
        }

        public bool CheckIfThisNipAlreadyExists(string nip)
        {
            return GetAll()
                    .Where(x => x.NIP.Equals(nip))
                    .Count() != 0;
        }

        public bool CheckIfThisMailAlreadyExists(string mail)
        {
            return GetAll()
                    .Where(x => x.Mail.Equals(mail))
                    .Count() != 0;
        }

        public Company GetByNip(string nip)
        {
            return GetAll()
                    .FirstOrDefault(x => x.NIP.Equals(nip));
        }
        
        public bool UpdateDriversList(string nip, IEnumerable<DriverAccount> drivers)
        {
            var company = GetByNip(nip);

            if (company != null)
            {
                try
                {
                    var driversToAdd = drivers.ToList();
                    company.Drivers = driversToAdd;
                    Update(company);

                    return true;
                }
                catch (System.Exception)
                {
                    return false;
                }
            }

            return false;
        }
    }
}
