using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.BrandModels;
using FleetManagement.Entities.Brands;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using NHibernate;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class VehiclesRepository : DbBasicOperations<Vehicle>, IVehicleProvider
    {
        private readonly ISessionFactory sessionFactory;
        private readonly IBrandModelProvider brandModelProvider;
        private readonly IBrandProvider brandProvider;

        public VehiclesRepository(ISessionFactory sessionFactory, IBrandModelProvider brandModelProvider,
            IBrandProvider brandProvider) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
            this.brandModelProvider = brandModelProvider;
            this.brandProvider = brandProvider;
        }

        public Vehicle GetByVinNumber(string vin)
        {
            return GetAll()
                .FirstOrDefault(x => x.VIN.Equals(vin)) ?? null;
        }

        public string GetVehicleName(string vin)
        {
            var vehicle = GetByVinNumber(vin);

            if (vehicle != null)
            {
                var brand = brandProvider.GetById(vehicle.Brand.Id);
                var model = brandModelProvider.GetById(vehicle.Model.Id);

                if (brand != null && model != null)
                    return $"{brand.Name} {model.Name}";
            }
            
            return string.Empty;
        }

        public List<Vehicle> GetVehiclesByVinNumber(string[] vinNumbers)
        {
            if (vinNumbers.Length == 0)
                return new List<Vehicle>();

            return GetAll()
                .Where(x => vinNumbers.Contains(x.VIN))
                .ToList();
        }
    }
}
