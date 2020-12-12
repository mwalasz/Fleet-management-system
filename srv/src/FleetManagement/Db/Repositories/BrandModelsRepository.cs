using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.BrandModels;
using FleetManagement.Entities.BrandModels.Models;
using NHibernate;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class BrandModelsRepository : DbBasicOperations<BrandModel>, IBrandModelProvider
    {
        public BrandModelsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
        }

        public BrandModel GetByName(string name)
        {
            return GetAll()
                .FirstOrDefault(x => x.Name.Equals(name));
        }
    }
}
