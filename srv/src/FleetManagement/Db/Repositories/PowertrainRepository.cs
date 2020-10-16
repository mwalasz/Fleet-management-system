using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Powertrains;
using FleetManagement.Entities.Powertrains.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class PowertrainRepository : DbBasicOperations<Powertrain>, IPowertrainProvider
    {
        private readonly ISessionFactory sessionFactory;

        public PowertrainRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
