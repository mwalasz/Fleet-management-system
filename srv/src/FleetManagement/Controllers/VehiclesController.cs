using AutoMapper;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Brands;
using FleetManagement.Entities.Brands.Models;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.DriveTypes;
using FleetManagement.Entities.EngineTypes;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Powertrains;
using FleetManagement.Entities.Powertrains.Models;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Entities.Vehicles.Params;
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
        private readonly IDriveTypeProvider driveTypeProvider;
        private readonly IEngineTypeProvider engineTypeProvider;
        private readonly IBrandProvider brandProvider;

        public VehiclesController(IMapper mapper,
            IVehicleProvider vehicleProvider, 
            IPowertrainProvider powertrainProvider,
            IManagerAccountProvider managerAccountProvider,
            ICompanyProvider companyProvider,
            IDriveTypeProvider driveTypeProvider,
            IEngineTypeProvider engineTypeProvider,
            IBrandProvider brandProvider)
        {
            this.mapper = mapper;
            this.vehicleProvider = vehicleProvider;
            this.powertrainProvider = powertrainProvider;
            this.managerAccountProvider = managerAccountProvider;
            this.companyProvider = companyProvider;
            this.driveTypeProvider = driveTypeProvider;
            this.engineTypeProvider = engineTypeProvider;
            this.brandProvider = brandProvider;
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
        public IActionResult Add([FromBody] NewVehicleParams newVehicle)
        {
            var company = managerAccountProvider.GetCompany(newVehicle.CompanyManagerMail);
            if (company == null)
                return BadRequest("Kierownik nie zarządza żadnym przedsiębiorstwem!");

            if (vehicleProvider.CheckIfThisLicensePlateAlreadyExists(newVehicle.LicensePlate))
                return BadRequest("Pojazd o podanym numerze tablicy rejestracyjnej już istnieje!");

            if (vehicleProvider.CheckIfThisVinAlreadyExists(newVehicle.VIN))
                return BadRequest("Pojazd o podanym numerze VIN już istnieje!");

            return vehicleProvider.AddNewVehicle(newVehicle, company)
                ? Ok()
                : (IActionResult)BadRequest("Nie udało się dodać pojazdu");
        }

        [HttpGet]
        public IActionResult GetDataForNew()
        {
            var availableBrands = brandProvider.GetAll()
                .Select(x => mapper.Map<Brand, BrandDto>(x));

            var availableEngineTypes = engineTypeProvider.GetAll()
                .Select(x => x.Name);

            var availableDriveTypes = driveTypeProvider.GetAll()
                .Select(x => x.Name);

            return Ok(new DataForCreatingNewVehicle() 
            { 
                Brands = availableBrands,
                DriveTypes = availableDriveTypes,
                EngineTypes = availableEngineTypes
            });
        }
    }
}
