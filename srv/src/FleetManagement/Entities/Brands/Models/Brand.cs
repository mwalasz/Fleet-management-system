using FleetManagement.Entities.BrandModels.Models;
using FluentNHibernate.Mapping;
using System.Collections.Generic;

namespace FleetManagement.Entities.Brands.Models
{
    public class Brand : EntityBase
    {
        public virtual string Name { get; set; }
        public virtual IList<BrandModel> Models { get; set; }
    }

    public class BrandMap : ClassMap<Brand>
    {
        public BrandMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            HasMany(x => x.Models)
                .Cascade.All()
                .Not.LazyLoad();
        }
    }
}
