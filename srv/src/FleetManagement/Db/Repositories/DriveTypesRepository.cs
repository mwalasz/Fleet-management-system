using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.DriveTypes;
using FleetManagement.Entities.DriveTypes.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class DriveTypesRepository : DbBasicOperations<DriveType>, IDriveTypeProvider
    {
        private readonly ISessionFactory sessionFactory;

        public DriveTypesRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }
    }
}
