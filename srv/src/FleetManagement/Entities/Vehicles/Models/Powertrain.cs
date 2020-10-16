using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.Vehicles.Models
{
    public class Powertrain
    {
        public virtual int Id { get; set; }

        /// <summary>
        /// Pojemność silnika.
        /// </summary>
        public virtual short EngineCapacity { get; set; }

        /// <summary>
        /// Ilość cylindrów.
        /// </summary>
        public virtual short NumberOfCylinders { get; set; }

        /// <summary>
        /// Rodzaj silnika - hybryda/diesel/benzyna.
        /// </summary>
        public virtual string EngineType { get; set; }

        /// <summary>
        /// Rodzaj napędu - FWD/RWD/4x4.
        /// </summary>
        public virtual string DriveType { get; set; }
    }

    public class PowertrainMap : ClassMap<Powertrain>
    {
        public PowertrainMap()
        {
            Id(x => x.Id);
            Map(x => x.EngineCapacity);
            Map(x => x.NumberOfCylinders);
            Map(x => x.EngineType);
            Map(x => x.DriveType);
        }
    }
}
