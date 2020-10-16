using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Powertrains.Models;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Trips.Models;
using System;
using System.Collections.Generic;

namespace FleetManagement.Entities.Vehicles.Models
{
    public class VehicleDto
    {
        public string Brand { get; set; }

        public string Model { get; set; }

        public string LicensePlate { get; set; }

        public string VIN { get; set; }

        public int KmMileage { get; set; }

        public int CurbWeight { get; set; }

        public short YearOfProduction { get; set; }

        public DateTime TechnicalInspectionDate { get; set; }

        public DateTime InsuranceExpirationDate { get; set; }

        public PowertrainDto Powertrain { get; set; }

        public List<MaintenanceDto> RepairsAndServices { get; set; }

        public List<RefuelingDto> Refuelings { get; set; }

        public List<TripDto> Trips { get; set; }
    }
}
