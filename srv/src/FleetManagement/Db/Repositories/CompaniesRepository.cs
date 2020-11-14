using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class CompaniesRepository : DbBasicOperations<Company>, ICompanyProvider
    {
        private readonly ISessionFactory sessionFactory;

        public CompaniesRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
