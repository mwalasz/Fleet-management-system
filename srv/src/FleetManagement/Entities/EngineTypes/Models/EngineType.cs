using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.EngineTypes.Models
{
    public class EngineType : EntityBase
    {
        public virtual string Name { get; set; }
    }

    public class EngineTypeMap : ClassMap<EngineType>
    {
        public EngineTypeMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
        }
    }
}
