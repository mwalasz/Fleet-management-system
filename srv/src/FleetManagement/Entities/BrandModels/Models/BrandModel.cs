using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.BrandModels.Models
{
    public class BrandModel : EntityBase
    {
        public virtual string Name { get; set; }
    }

    public class BrandModelMap : ClassMap<BrandModel>
    {
        public BrandModelMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
        }
    }

    public class BrandModelDto : EntityBase
    {
        public string Name { get; set; }
    }
}
