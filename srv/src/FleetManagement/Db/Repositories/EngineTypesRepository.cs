using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.EngineTypes;
using FleetManagement.Entities.EngineTypes.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class EngineTypesRepository : DbBasicOperations<EngineType>, IEngineTypeProvider
    {
        private readonly ISessionFactory sessionFactory;

        public EngineTypesRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
