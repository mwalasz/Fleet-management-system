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
        /// Określa aktywność firmy.
        /// </summary>
        public virtual bool IsActive { get; set; }
        
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
            Map(x => x.Name)
                .Unique()
                .Not.Nullable();
            Map(x => x.Description)
                .Nullable();
            Map(x => x.NIP)
                .Unique()
                .Not.Nullable();
            Map(x => x.Address);
            Map(x => x.Mail)
                .Unique()
                .Not.Nullable();
            Map(x => x.PhoneNumber)
                .Not.Nullable();
            Map(x => x.IsActive)
                .Not.Nullable();
            Map(x => x.ManagerAccountId)
                .Not.Nullable();
            HasMany(x => x.Drivers)
                .Cascade.All()
                .Not.LazyLoad();
            HasMany(x => x.Vehicles)
                .Cascade.All()
                .Not.LazyLoad();
        }
    }
}
