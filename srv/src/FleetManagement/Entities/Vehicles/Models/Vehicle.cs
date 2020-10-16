using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Trips.Models;
using FluentNHibernate.Mapping;
using System;
using System.Collections;
using System.Collections.Generic;

namespace FleetManagement.Entities.Vehicles.Models
{
    public class Vehicle : EntityBase
    {
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
        /// Masa własna pojazdu.
        /// </summary>
        public virtual int CurbWeight { get; set; }

        /// <summary>
        /// Rok produkcji.
        /// </summary>
        public virtual short YearOfProduction { get; set; }

        /// <summary>
        /// Data ważności przeglądu technicznego.
        /// </summary>
        public virtual DateTime TechnicalInspectionDate { get; set; }

        /// <summary>
        /// Data wygaśnięcia polisy ubezpieczeniowej.
        /// </summary>
        public virtual DateTime InsuranceExpirationDate { get; set; }

        /// <summary>
        /// Napęd.
        /// </summary>
        public virtual int PowertrainId { get; set; }
        
        /// <summary>
        /// Naprawy.
        /// </summary>
        public virtual IList<Maintenance> RepairsAndServices { get; set; }
        
        /// <summary>
        /// Tankowania.
        /// </summary>
        public virtual IList<Refueling> Refuelings { get; set; }
        
        /// <summary>
        /// Wyjazdy.
        /// </summary>
        public virtual IList<Trip> Trips { get; set; }

        //TODO: dodać wymaganą kategorię prawa jazdy
    }

    public class VehicleMap : ClassMap<Vehicle>
    {
        public VehicleMap()
        {
            Id(x => x.Id);
            Map(x => x.Brand)
                .Not.Nullable();
            Map(x => x.Model)
                .Not.Nullable();
            Map(x => x.LicensePlate)
                .Unique()
                .Not.Nullable();
            Map(x => x.VIN)
                .Unique()
                .Not.Nullable();
            Map(x => x.CurbWeight);
            Map(x => x.KmMileage)
                .Not.Nullable();
            Map(x => x.YearOfProduction)
                .Not.Nullable();
            Map(x => x.TechnicalInspectionDate)
                .Not.Nullable();
            Map(x => x.InsuranceExpirationDate)
                .Not.Nullable();
            Map(x => x.PowertrainId)
                .Not.Nullable();
            HasMany(x => x.RepairsAndServices)
                .Cascade.All()
                .Not.LazyLoad();
            HasMany(x => x.Refuelings)
                .Cascade.All()
                .Not.LazyLoad();
            HasMany(x => x.Trips)
                .Cascade.All()
                .Not.LazyLoad();
        }
    }
}
