using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.DriverAccounts.Models
{
    public class DriverAccount
    {
        public virtual int Id { get; set; }
        public virtual int UserAccountId { get; set; }
        public virtual string DrivingLicenseNumber { get; set; }
        public virtual string Vehicles { get; set; } //TODO: zmiana typu
    }

    public class DriverAccountMap : ClassMap<DriverAccount>
    {
        public DriverAccountMap()
        {
            Id(x => x.Id);
            Map(x => x.UserAccountId)
                .Not.Nullable();
            Map(x => x.DrivingLicenseNumber)
                .Not.Nullable();
            Map(x => x.Vehicles)
                .Nullable();
        }
    }
}
