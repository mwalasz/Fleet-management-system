using FluentNHibernate.Mapping;
using System;

namespace FleetManagement.Entities.Maintenances.Models
{
    public class Maintenance : EntityBase
    {
        /// <summary>
        /// Data wykonania.
        /// </summary>
        public virtual DateTime Date { get; set; }

        /// <summary>
        /// Stan licznika na czas wykonania usługi.
        /// </summary>
        public virtual int OdometerMileage { get; set; }
        
        /// <summary>
        /// Koszt.
        /// </summary>
        public virtual double Cost { get; set; }

        /// <summary>
        /// Użyte części.
        /// </summary>
        public virtual string UsedParts { get; set; } //TODO: zmiana na listę stringów.

        /// <summary>
        /// Opis.
        /// </summary>
        public virtual string Description { get; set; }

        /// <summary>
        /// Opis wykonawcy usługi.
        /// </summary>
        public virtual string MaintenanceProviderDescription { get; set; }
    }

    public class MaintenanceMap : ClassMap<Maintenance>
    {
        public MaintenanceMap()
        {
            Id(x => x.Id);
            Map(x => x.Date)
                .Not.Nullable();
            Map(x => x.OdometerMileage)
                .Not.Nullable();
            Map(x => x.Cost)
                .Not.Nullable();
            Map(x => x.UsedParts);
            Map(x => x.Description);
            Map(x => x.MaintenanceProviderDescription);
        }
    }
}
