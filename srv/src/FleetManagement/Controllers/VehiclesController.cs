using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Powertrains;
using FleetManagement.Entities.Powertrains.Models;
using FleetManagement.Entities.Refuelings.Models;
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
        private readonly IDriverAccountProvider driverAccountProvider;

        public VehiclesController(IMapper mapper,
            IVehicleProvider vehicleProvider, 
            IPowertrainProvider powertrainProvider,
            IDriverAccountProvider driverAccountProvider)
        {
            this.mapper = mapper;
            this.vehicleProvider = vehicleProvider;
            this.powertrainProvider = powertrainProvider;
            this.driverAccountProvider = driverAccountProvider;
        }

        [HttpGet]
        public IEnumerable<VehicleDto> GetAll()
        {
            return vehicleProvider.GetAll()
                .Select(x => mapper.Map<Vehicle, VehicleDto>(x));
        }

        [HttpGet]
        public IActionResult GetPowertrain([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return NotFound("No vehicle with corresponding VIN number!");

            var powertrain = powertrainProvider.GetById(vehicle?.Powertrain.Id);

            var toReturn = powertrain != null
                ? mapper.Map<Powertrain, PowertrainDto>(powertrain)
                : null;

            return Ok(toReturn);
        }

        [HttpGet]
        public IActionResult GetAllRefuelings([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return NotFound("No vehicle with corresponding VIN number!");

            var refuelings = vehicle.Refuelings.Select(x => mapper.Map<Refueling, RefuelingDto>(x));

            return Ok(refuelings);
        }

        [HttpGet]
        public IActionResult GetAllMaintenances([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return NotFound("No vehicle with corresponding VIN number!");

            var repairs = vehicle.RepairsAndServices.Select(x => mapper.Map<Maintenance, MaintenanceDto>(x));

            return Ok(repairs);
        }

        [HttpGet]
        public IActionResult GetAllTrips([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return NotFound("No vehicle with corresponding VIN number!");

            var trips = vehicle.Trips.Select(x => mapper.Map<Trip, TripDto>(x));

            return Ok(trips);
        }
    }
}
