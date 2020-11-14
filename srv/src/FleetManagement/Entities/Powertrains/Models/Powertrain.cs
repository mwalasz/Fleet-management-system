using FleetManagement.Entities.DriveTypes.Models;
using FleetManagement.Entities.EngineTypes.Models;
using FluentNHibernate.Mapping;

namespace FleetManagement.Entities.Powertrains.Models
{
    public class Powertrain : EntityBase
    {
        /// <summary>
        /// Pojemność silnika.
        /// </summary>
        public virtual short EngineCapacity { get; set; }

        /// <summary>
        /// Ilość cylindrów.
        /// </summary>
        public virtual short NumberOfCylinders { get; set; }
        
        /// <summary>
        /// Moc w koniach mechanicznych.
        /// </summary>
        public virtual short Horsepower { get; set; }

        /// <summary>
        /// Moment obrotowy.
        /// </summary>
        public virtual short Torque { get; set; }

        /// <summary>
        /// Rodzaj silnika - hybryda/diesel/benzyna.
        /// </summary>
        public virtual EngineType EngineType { get; set; }

        /// <summary>
        /// Rodzaj napędu - FWD/RWD/4x4.
        /// </summary>
        public virtual DriveType DriveType { get; set; }
    }

    public class PowertrainMap : ClassMap<Powertrain>
    {
        public PowertrainMap()
        {
            Id(x => x.Id);
            Map(x => x.EngineCapacity);
            Map(x => x.Horsepower);
            Map(x => x.Torque);
            Map(x => x.NumberOfCylinders);
            References(x => x.EngineType);
            References(x => x.DriveType);
        }
    }
}
