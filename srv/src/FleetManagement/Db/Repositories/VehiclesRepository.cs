﻿using FleetManagement.Db.BaseOperations;
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

        public VehiclesRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }

        public Vehicle GetByVinNumber(string vin)
        {
            return GetAll()
                .FirstOrDefault(x => x.VIN.Equals(vin)) ?? null;
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
