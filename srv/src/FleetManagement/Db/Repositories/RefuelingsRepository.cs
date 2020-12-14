using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Refuelings;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Refuelings.Params;
using NHibernate;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class RefuelingsRepository : DbBasicOperations<Refueling>, IRefuelingProvider
    {
        private readonly ISessionFactory sessionFactory;

        public RefuelingsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }

        public Refueling GetByParams(NewRefuelingParams newRefueling)
        {
            return GetAll()
                .Where(x => x.Cost == newRefueling.Cost)
                .Where(x => x.Liters == newRefueling.Liters)
                .Where(x => x.PlaceDescription == newRefueling.PlaceDescription)
                .FirstOrDefault(x => x.OdometerMileage == newRefueling.OdometerMileage);
        }
    }
}