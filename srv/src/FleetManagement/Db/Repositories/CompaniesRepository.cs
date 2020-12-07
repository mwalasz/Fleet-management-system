using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using NHibernate;
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
    }
}
