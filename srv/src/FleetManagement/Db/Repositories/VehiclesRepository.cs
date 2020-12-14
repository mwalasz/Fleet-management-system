using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.BrandModels;
using FleetManagement.Entities.Brands;
using FleetManagement.Entities.Brands.Models;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Powertrains;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Entities.Vehicles.Params;
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
        private readonly ICompanyProvider companyProvider;
        private readonly IPowertrainProvider powertrainProvider;

        public VehiclesRepository(ISessionFactory sessionFactory, IBrandModelProvider brandModelProvider,
            IBrandProvider brandProvider, ICompanyProvider companyProvider,
            IPowertrainProvider powertrainProvider) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
            this.brandModelProvider = brandModelProvider;
            this.brandProvider = brandProvider;
            this.companyProvider = companyProvider;
            this.powertrainProvider = powertrainProvider;
        }
        public bool CheckIfThisLicensePlateAlreadyExists(string licensePlate)
        {
            return GetAll()
                    .Where(x => x.LicensePlate.Equals(licensePlate))
                    .Count() != 0;
        }

        public bool CheckIfThisVinAlreadyExists(string vin)
        {
            return GetAll()
                    .Where(x => x.VIN.Equals(vin))
                    .Count() != 0;
        }

        public bool AddNewVehicle(NewVehicleParams newVehicle, Company company)
        {
            try
            {
                var isNewBrand = brandProvider.AddIfNotExists(newVehicle.Brand, newVehicle.Model);
                var brand = brandProvider.GetByName(newVehicle.Brand);
                var model = brandModelProvider.GetByName(newVehicle.Model);
                var powertrain = powertrainProvider.CreateNewAndGet(newVehicle);

                if (brand == null || model == null || powertrain == null)
                    return false;

                Add(new Vehicle()
                {
                    IsActive = true,
                    Brand = brand,
                    Model = model,
                    Powertrain = powertrain,
                    YearOfProduction = newVehicle.YearOfProduction,
                    VIN = newVehicle.VIN,
                    LicensePlate = newVehicle.LicensePlate,
                    TechnicalInspectionDate = newVehicle.TechnicalInspectionDate,
                    InsuranceExpirationDate = newVehicle.InsuranceExpirationDate,
                    CurbWeight = newVehicle.CurbWeight,
                    KmMileage = newVehicle.KmMileage,
                    RepairsAndServices = new List<Maintenance>(),
                    Refuelings = new List<Refueling>(),
                    Trips = new List<Trip>(),
                });

                var addedVehicle = GetByVinNumber(newVehicle.VIN);
                company.Vehicles.Add(addedVehicle);
                companyProvider.Update(company);

                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
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
