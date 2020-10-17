using FleetManagement.Entities.Vehicles.Models;
using FluentNHibernate.Mapping;
using System.Collections.Generic;

namespace FleetManagement.Entities.Accounts.DriverAccounts.Models
{
    public class DriverAccount : EntityBase
    {
        public virtual int UserAccountId { get; set; }
        
        /// <summary>
        /// Numer prawa jazdy.
        /// </summary>
        public virtual string DrivingLicenseNumber { get; set; }

        /// <summary>
        /// Przydzielone pojazdy.
        /// </summary>
        public virtual IList<Vehicle> Vehicles { get; set; }
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
            HasMany(x => x.Vehicles)
                .Cascade.All()
                .Not.LazyLoad();
        }
    }
}
