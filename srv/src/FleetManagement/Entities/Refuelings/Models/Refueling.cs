using FluentNHibernate.Mapping;
using System;

namespace FleetManagement.Entities.Refuelings.Models
{
    public class Refueling : EntityBase
    {
        /// <summary>
        /// Czas tankowania.
        /// </summary>
        public virtual DateTime Time { get; set; }

        /// <summary>
        /// Miejsce - miejscowość/ulica/stacja.
        /// </summary>
        public virtual string PlaceDescription { get; set; }
        
        /// <summary>
        /// Koszt.
        /// </summary>
        public virtual double Cost { get; set; }

        /// <summary>
        /// Litry.
        /// </summary>
        public virtual double Liters { get; set; }

        /// <summary>
        /// Koszt litra.
        /// </summary>
        public virtual double CostPerLiter { get; set; }
    }

    public class RefuelingMap : ClassMap<Refueling>
    {
        public RefuelingMap()
        {
            Id(x => x.Id);
            Map(x => x.Time);
            Map(x => x.PlaceDescription);
            Map(x => x.Liters)
                .Not.Nullable();
            Map(x => x.Cost)
                .Not.Nullable();
            Map(x => x.CostPerLiter);
        }
    }
}
