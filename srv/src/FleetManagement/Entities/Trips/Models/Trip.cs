using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.Trips.Models
{
    public class Trip : EntityBase
    {
        /// <summary>
        /// Miejsce rozpoczęcia podróży.
        /// </summary>
        public virtual string StartPlace { get; set; }

        /// <summary>
        /// Miejsce zakończenia podróży.
        /// </summary>
        public virtual string DestinationPlace { get; set; }

        /// <summary>
        /// Przejechany dystans.
        /// </summary>
        public virtual double Distance { get; set; }

        /// <summary>
        /// Czas podróży.
        /// </summary>
        public virtual double TravelTime { get; set; }

        /// <summary>
        /// Średnia prędkość.
        /// </summary>
        public virtual double AverageSpeed{ get; set; }

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
            Map(x => x.DestinationPlace)
                .Not.Nullable();
            Map(x => x.Distance)
                .Not.Nullable();
            Map(x => x.TravelTime);
            Map(x => x.AverageSpeed);
            Map(x => x.DriverAccountId)
                .Not.Nullable();
        }
    }
}
