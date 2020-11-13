﻿using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Brands;
using FleetManagement.Entities.Brands.Models;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class BrandsRepository : DbBasicOperations<Brand>, IBrandProvider
    {
        public BrandsRepository(ISessionFactory sessionFactory) : base(sessionFactory)
        {
        }
    }
}
