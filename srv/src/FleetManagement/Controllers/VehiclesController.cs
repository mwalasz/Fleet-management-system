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

        public VehiclesController(IVehicleProvider vehicleProvider, IPowertrainProvider powertrainProvider)
        {
            this.vehicleProvider = vehicleProvider;
            this.powertrainProvider = powertrainProvider;
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
    }
}
