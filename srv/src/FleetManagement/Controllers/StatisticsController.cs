using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Statistics;
using FleetManagement.Statistics.Models;
using FleetManagement.Statistics.Models.Drivers;
using FleetManagement.Statistics.Models.Vehicles;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NHibernate.Mapping;
using System.Collections.Generic;

namespace FleetManagement.Controllers
{

    [ApiController]
    [AllowAnonymous] // TODO: zmienić
    public class StatisticsController : ControllerBase
    {
        const string DRIVER_STATISTICS_ROUTE = "api/[controller]/driver/[action]";
        const string VEHICLE_STATISTICS_ROUTE = "api/[controller]/vehicle/[action]";

        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly IVehicleProvider vehicleProvider;
        private readonly IChartsService charts;
        private readonly IStatisticsService statistics;

        public StatisticsController(IDriverAccountProvider driverAccountProvider, 
            IVehicleProvider vehicleProvider, IChartsService charts,
            IStatisticsService statistics)
        {
            this.driverAccountProvider = driverAccountProvider;
            this.vehicleProvider = vehicleProvider;
            this.charts = charts;
            this.statistics = statistics;
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]

        public IActionResult Get([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var stats = statistics.CalculateDriverDrivingData(driver);

            return Ok(stats);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetMileagePerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var stats = charts.GetSummaryDistancePerVehicle(driver);

            return Ok(stats);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetDurationPerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var stats = charts.GetSummaryDurationPerVehicle(driver);

            return Ok(stats);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetSpeedsPerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var speeds = charts.GetSpeedsPerVehicle(driver);
            
            return Ok(speeds);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetDataPerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var duration = charts.GetSummaryDurationPerVehicle(driver);
            var distance = charts.GetSummaryDistancePerVehicle(driver);
            var speeds = charts.GetSpeedsPerVehicle(driver);
            
            return Ok(new ChartSummaryDataPerVehicle { Distance = distance, Duration = duration, Speed = speeds });
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetAll([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var duration = charts.GetSummaryDurationPerVehicle(driver);
            var distance = charts.GetSummaryDistancePerVehicle(driver);
            var speeds = charts.GetSpeedsPerVehicle(driver);
            var stats = statistics.CalculateDriverDrivingData(driver);
            
            return Ok(
                new CombinedDriverStatistics
                { 
                    DriverData = stats, 
                    PerVehicleData = new ChartSummaryDataPerVehicle
                    {
                        Distance = distance, 
                        Duration = duration, 
                        Speed = speeds 
                    },
                }
            );
        }

        [HttpGet]
        [Route(VEHICLE_STATISTICS_ROUTE)]
        public IActionResult GetCosts([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return NotFound("Nie znaleziono pojazdu o podanym numerze vin!");

            var stats = statistics.CalculateVehicleCostsData(vehicle);
            
            return Ok(stats);
        }

        [HttpGet]
        [Route(VEHICLE_STATISTICS_ROUTE)]
        public IActionResult GetDriving([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return NotFound("Nie znaleziono pojazdu o podanym numerze vin!");

            var stats = statistics.CalculateVehicleDrivingData(vehicle);
            
            return Ok(stats);
        }

        [HttpGet]
        [Route(VEHICLE_STATISTICS_ROUTE)]
        public IActionResult GetAllPerVehicle([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return NotFound("Nie znaleziono pojazdu o podanym numerze vin!");

            return Ok(
                new CombinedVehicleStatistics()
                {
                   Costs = new CostsData()
                   {
                       Data = statistics.CalculateVehicleCostsData(vehicle),
                       //Charts = 
                   },
                   Driving = new DrivingData()
                   {
                       Data = statistics.CalculateVehicleDrivingData(vehicle),
                       //Charts = 
                   }
                }
            );
        }
    }
}
