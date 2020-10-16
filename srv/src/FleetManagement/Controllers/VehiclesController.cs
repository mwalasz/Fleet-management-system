using FleetManagement.Entities.Refuelings;
using FleetManagement.Entities.Refuelings.Models;
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

        public VehiclesController(IVehicleProvider vehicleProvider, 
            IPowertrainProvider powertrainProvider,
            IRefuelingProvider refuelingProvider)
        {
            this.vehicleProvider = vehicleProvider;
            this.powertrainProvider = powertrainProvider;
            this.refuelingProvider = refuelingProvider;
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
    }
}
