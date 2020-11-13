using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.BrandModels;
using FleetManagement.Entities.BrandModels.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class BrandModelsRepository : DbBasicOperations<BrandModel>, IBrandModelProvider
    {
        public BrandModelsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
        }
    }
}
