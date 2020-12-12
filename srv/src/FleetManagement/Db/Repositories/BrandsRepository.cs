using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.BrandModels;
using FleetManagement.Entities.BrandModels.Models;
using FleetManagement.Entities.Brands;
using FleetManagement.Entities.Brands.Models;
using NHibernate;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.Db.Repositories
{
    public class BrandsRepository : DbBasicOperations<Brand>, IBrandProvider
    {
        private readonly IBrandModelProvider brandModelProvider;

        public BrandsRepository(ISessionFactory sessionFactory, IBrandModelProvider brandModelProvider) : base(sessionFactory)
        {
            this.brandModelProvider = brandModelProvider;
        }

        public bool AddIfNotExists(string brandName, string modelName)
        {
            var brand = GetByName(brandName);
            var model = brandModelProvider.GetByName(modelName);

            try
            {
                if (brand == null)
                {
                    Add(new Brand() 
                    { 
                        Name = brandName,
                        Models = new List<BrandModel>()
                        { 
                            new BrandModel() 
                            { 
                                Name = modelName
                            } 
                        } 
                    });

                    return true;
                }
                else if (model == null)
                {
                    brandModelProvider.Add(new BrandModel() 
                    { 
                        Name = modelName
                    });

                    var newModel = brandModelProvider.GetByName(modelName);
                    brand.Models.Add(newModel);
                    
                    Update(brand);

                    return true;
                }
                else return false;
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        public Brand GetByName(string name)
        {
            return GetAll()
                .FirstOrDefault(x => x.Name.Equals(name));
        }
    }
}
