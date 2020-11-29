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
                    .Where(x => x.Name == name)
                    .Count() != 0;
        }

        public bool CheckIfThisNipAlreadyExists(string nip)
        {
            return GetAll()
                    .Where(x => x.NIP == nip)
                    .Count() != 0;
        }
    }
}
