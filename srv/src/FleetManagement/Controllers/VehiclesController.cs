using AutoMapper;
using FleetManagement.Entities.Maintenances;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Powertrains;
using FleetManagement.Entities.Powertrains.Models;
using FleetManagement.Entities.Refuelings;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous]
    public class VehiclesController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IVehicleProvider vehicleProvider;
        private readonly IPowertrainProvider powertrainProvider;
        private readonly IRefuelingProvider refuelingProvider;
        private readonly IMaintenanceProvider maintenanceProvider;
        private readonly ITripProvider tripProvider;

        public VehiclesController(IMapper mapper,
            IVehicleProvider vehicleProvider, 
            IPowertrainProvider powertrainProvider,
            IRefuelingProvider refuelingProvider,
            IMaintenanceProvider maintenanceProvider,
            ITripProvider tripProvider)
        {
            this.mapper = mapper;
            this.vehicleProvider = vehicleProvider;
            this.powertrainProvider = powertrainProvider;
            this.refuelingProvider = refuelingProvider;
            this.maintenanceProvider = maintenanceProvider;
            this.tripProvider = tripProvider;
        }

        [HttpGet]
        public IEnumerable<VehicleDto> GetAllVehicles()
        {
            return vehicleProvider.GetAll()
                .Select(x => mapper.Map<Vehicle, VehicleDto>(x));
        }

        [HttpGet]
        public IEnumerable<PowertrainDto> GetAllPowertrains()
        {
            return powertrainProvider.GetAll()
                .Select(x => mapper.Map<Powertrain, PowertrainDto>(x));
        }

        [HttpGet]
        public IEnumerable<RefuelingDto> GetAllRefuelings()
        {
            return refuelingProvider.GetAll()
                .Select(x => mapper.Map<Refueling, RefuelingDto>(x));
        }

        [HttpGet]
        public IEnumerable<MaintenanceDto> GetAllMaintenances()
        {
            return maintenanceProvider.GetAll()
                .Select(x => mapper.Map<Maintenance, MaintenanceDto>(x));
        }

        [HttpGet]
        public IEnumerable<TripDto> GetAllTrips()
        {
            return tripProvider.GetAll()
                .Select(x => mapper.Map<Trip, TripDto>(x));
        }
    }
}
