using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Companies;
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
        private readonly IManagerAccountProvider managerAccountProvider;
        private readonly ICompanyProvider companyProvider;
        private readonly IDriverAccountProvider driverAccountProvider;

        public VehiclesController(IMapper mapper,
            IVehicleProvider vehicleProvider, 
            IPowertrainProvider powertrainProvider,
            IManagerAccountProvider managerAccountProvider,
            ICompanyProvider companyProvider,
            IDriverAccountProvider driverAccountProvider)
        {
            this.mapper = mapper;
            this.vehicleProvider = vehicleProvider;
            this.powertrainProvider = powertrainProvider;
            this.managerAccountProvider = managerAccountProvider;
            this.companyProvider = companyProvider;
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
                return BadRequest("Brak pojazdu o podanym numerze VIN!");

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
                return BadRequest("Brak pojazdu o podanym numerze VIN!");

            var refuelings = vehicle.Refuelings.Select(x => mapper.Map<Refueling, RefuelingDto>(x));

            return Ok(refuelings);
        }

        [HttpGet]
        public IActionResult GetAllMaintenances([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return BadRequest("Brak pojazdu o podanym numerze VIN!");

            var repairs = vehicle.RepairsAndServices.Select(x => mapper.Map<Maintenance, MaintenanceDto>(x));

            return Ok(repairs);
        }

        [HttpGet]
        public IActionResult GetAllTrips([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return BadRequest("Brak pojazdu o podanym numerze VIN!");

            var trips = vehicle.Trips.Select(x => mapper.Map<Trip, TripDto>(x));

            return Ok(trips);
        }

        [HttpGet]
        public IActionResult GetInfo([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return BadRequest("Brak pojazdu o podanym numerze VIN!");

            return Ok(mapper.Map<Vehicle, VehicleDto>(vehicle));
        }

        [HttpPut]
        public IActionResult ChangeAvailability(IEnumerable<string> vins, string managerMail, bool isActive = false)
        {
            var manager = managerAccountProvider.GetByMail(managerMail);

            if (manager == null)
                return NotFound("Nie znaleziono podanego kierownika!");

            var company = companyProvider.GetAll()
                .FirstOrDefault(x => x.ManagerAccountId == manager.Id);

            if (manager == null)
                return NotFound("Podany manager nie zarządza żadnym przedsiębiorstwem!");

            var vehicles = company.Vehicles.Where(x => vins.Contains(x.VIN)).ToList();

            if (vehicles.Count != 0)
            {
                foreach (var vehicle in vehicles)
                {
                    vehicle.IsActive = isActive;
                    vehicleProvider.Update(vehicle);
                }
            }

            return Ok("Pomyślnie zaktualizowano dostępność podanych pojazdów.");
        }

        [HttpPost]
        public IActionResult Add()
        {
            return Ok();
        }
    }
}
