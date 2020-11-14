using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Vehicles.Models;
using FluentNHibernate.Mapping;
using System.Collections.Generic;

namespace FleetManagement.Entities.Companies.Models
{
    public class Company : EntityBase
    {
        /// <summary>
        /// Nazwa.
        /// </summary>
        public virtual string Name { get; set; }
        
        /// <summary>
        /// Opis.
        /// </summary>
        public virtual string Description { get; set; }

        /// <summary>
        /// NIP.
        /// </summary>
        public virtual string NIP { get; set; }

        /// <summary>
        /// Adres.
        /// </summary>
        public virtual string Address { get; set; }        
        
        /// <summary>
        /// Adres.
        /// </summary>
        public virtual string Mail { get; set; }

        /// <summary>
        /// Numer telefonu.
        /// </summary>
        public virtual string PhoneNumber { get; set; }
        
        /// <summary>
        /// Konto menedżera.
        /// </summary>
        public virtual int ManagerAccountId { get; set; }
        
        /// <summary>
        /// Przypisani kierowcy.
        /// </summary>
        public virtual IList<DriverAccount> Drivers { get; set; }
        
        /// <summary>
        /// Posiadane pojazdy.
        /// </summary>
        public virtual IList<Vehicle> Vehicles { get; set; }
    }

    public class CompanyMap : ClassMap<Company>
    {
        public CompanyMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            Map(x => x.Description)
                .Nullable();            
            Map(x => x.NIP);
            Map(x => x.Address);
            Map(x => x.Mail);
            Map(x => x.PhoneNumber);
            Map(x => x.ManagerAccountId);
            HasMany(x => x.Drivers)
                .Cascade.All()
                .Not.LazyLoad();
            HasMany(x => x.Vehicles)
                .Cascade.All()
                .Not.LazyLoad();
        }
    }
}
