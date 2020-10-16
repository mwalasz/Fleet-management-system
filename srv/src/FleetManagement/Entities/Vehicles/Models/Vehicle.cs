using FluentNHibernate.Mapping;
using System;

namespace FleetManagement.Entities.Vehicles.Models
{
    public class Vehicle
    {
        public virtual int Id { get; set; }

        /// <summary>
        /// Marka.
        /// </summary>
        public virtual string Brand { get; set; }
        
        /// <summary>
        /// Model.
        /// </summary>
        public virtual string Model { get; set; }
        
        /// <summary>
        /// Tablica rejestracyjna.
        /// </summary>
        public virtual string LicensePlate { get; set; }

        /// <summary>
        /// Numer VIN.
        /// </summary>
        public virtual string VIN { get; set; }
        
        /// <summary>
        /// Przebieg w kilometrach.
        /// </summary>
        public virtual int KmMileage { get; set; }

        /// <summary>
        /// Rok produkcji.
        /// </summary>
        public virtual short YearOfProduction { get; set; }

        /// <summary>
        /// Data ważności przeglądu technicznego.
        /// </summary>
        public virtual DateTime TechnicalInspectionDate { get; set; }

        /// <summary>
        /// Napęd.
        /// </summary>
        public virtual int PowertrainId { get; set; }
    }

    public class VehicleMap : ClassMap<Vehicle>
    {
        public VehicleMap()
        {
            Id(x => x.Id);
            Map(x => x.Brand);
            Map(x => x.Model);
            Map(x => x.LicensePlate);
            Map(x => x.VIN);
            Map(x => x.KmMileage);
            Map(x => x.YearOfProduction);
            Map(x => x.TechnicalInspectionDate);
            Map(x => x.PowertrainId);
        }
    }
}
