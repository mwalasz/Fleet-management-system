using FluentNHibernate.Mapping;
using System;

namespace FleetManagement.Entities.Trips.Models
{
    public class Trip : EntityBase
    {
        /// <summary>
        /// Miejsce rozpoczęcia podróży.
        /// </summary>
        public virtual string StartPlace { get; set; }

        /// <summary>
        /// Czas rozpoczęcia podróży.
        /// </summary>
        public virtual DateTime StartTime { get; set; }

        /// <summary>
        /// Miejsce zakończenia podróży.
        /// </summary>
        public virtual string DestinationPlace { get; set; }

        /// <summary>
        /// Czas zakończenia podróży.
        /// </summary>
        public virtual DateTime DestinationArrivalTime { get; set; }

        /// <summary>
        /// Przejechany dystans [m].
        /// </summary>
        public virtual double Distance { get; set; }

        /// <summary>
        /// Czas podróży [s].
        /// </summary>
        public virtual double TravelTime { get; set; }

        /// <summary>
        /// Średnia prędkość [km/h].
        /// </summary>
        public virtual double AverageSpeed { get; set; }

        /// <summary>
        /// Średnia prędkość [km/h].
        /// </summary>
        public virtual double MaximumSpeed { get; set; }

        /// <summary>
        /// Kierowca.
        /// </summary>
        public virtual int DriverAccountId { get; set; }
    }

    public class TripMap : ClassMap<Trip>
    {
        public TripMap()
        {
            Id(x => x.Id);
            Map(x => x.StartPlace)
                .Not.Nullable();
            Map(x => x.StartTime);
            Map(x => x.DestinationPlace)
                .Not.Nullable();
            Map(x => x.DestinationArrivalTime);
            Map(x => x.Distance)
                .Not.Nullable();
            Map(x => x.TravelTime);
            Map(x => x.AverageSpeed);
            Map(x => x.MaximumSpeed);
            Map(x => x.DriverAccountId)
                .Not.Nullable();
        }
    }
}
