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

        public VehiclesController(IVehicleProvider vehicleProvider)
        {
            this.vehicleProvider = vehicleProvider;
        }

        [HttpGet]
        public IEnumerable<Vehicle> GetAllVehicles()
        {
            return vehicleProvider.GetAll();
        }
    }
}
