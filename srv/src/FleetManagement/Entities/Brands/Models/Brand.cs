using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.Brands.Models
{
    public class Brand : EntityBase
    {
        public virtual string Name { get; set; }
    }

    public class BrandMap : ClassMap<Brand>
    {
        public BrandMap()
        {
            Id(x => x.Id);
            Map(x => x.Name)
                .Not.Nullable();
        }
    }
}
