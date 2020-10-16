using FleetManagement.Entities.Maintenances;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Refuelings;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleProvider vehicleProvider;
        private readonly IPowertrainProvider powertrainProvider;
        private readonly IRefuelingProvider refuelingProvider;
        private readonly IMaintenanceProvider maintenanceProvider;
        private readonly ITripProvider tripProvider;

        public VehiclesController(IVehicleProvider vehicleProvider, 
            IPowertrainProvider powertrainProvider,
            IRefuelingProvider refuelingProvider,
            IMaintenanceProvider maintenanceProvider,
            ITripProvider tripProvider)
        {
            this.vehicleProvider = vehicleProvider;
            this.powertrainProvider = powertrainProvider;
            this.refuelingProvider = refuelingProvider;
            this.maintenanceProvider = maintenanceProvider;
            this.tripProvider = tripProvider;
        }

        [HttpGet]
        public IEnumerable<Vehicle> GetAllVehicles()
        {
            return vehicleProvider.GetAll();
        }

        [HttpGet]
        public IEnumerable<Powertrain> GetAllPowertrains()
        {
            return powertrainProvider.GetAll();
        }

        [HttpGet]
        public IEnumerable<Refueling> GetAllRefuelings()
        {
            return refuelingProvider.GetAll();
        }

        [HttpGet]
        public IEnumerable<Maintenance> GetAllMaintenances()
        {
            return maintenanceProvider.GetAll();
        }

        [HttpGet]
        public IEnumerable<Trip> GetAllTrips()
        {
            return tripProvider.GetAll();
        }
    }
}
