using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.DriveTypes.Models
{
    public class DriveType : EntityBase
    {
        public virtual string Name { get; set; }
    }

    public class DriveTypeMap : ClassMap<DriveType>
    {
        public DriveTypeMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
        }
    }
}
