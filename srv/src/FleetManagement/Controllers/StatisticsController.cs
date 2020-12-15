using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Statistics;
using FleetManagement.Statistics.Models;
using FleetManagement.Statistics.Models.Drivers;
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
        private readonly IStatisticsService statistics;

        public StatisticsController(IDriverAccountProvider driverAccountProvider, IVehicleProvider vehicleProvider,
            IStatisticsService statistics)
        {
            this.driverAccountProvider = driverAccountProvider;
            this.vehicleProvider = vehicleProvider;
            this.statistics = statistics;
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]

        public IActionResult Get([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var stats = statistics.CalculateDriverStatistics(driver);

            return Ok(stats);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetMileagePerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var stats = statistics.CalculateSummaryDistancePerVehicle(driver);

            return Ok(stats);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetDurationPerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var stats = statistics.CalculateSummaryDurationPerVehicle(driver);

            return Ok(stats);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetSpeedsPerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var speeds = statistics.CalculateSpeedsPerVehicle(driver);
            
            return Ok(speeds);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetDataPerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var duration = statistics.CalculateSummaryDurationPerVehicle(driver);
            var distance = statistics.CalculateSummaryDistancePerVehicle(driver);
            var speeds = statistics.CalculateSpeedsPerVehicle(driver);
            
            return Ok(new ChartSummaryDataPerVehicle { Distance = distance, Duration = duration, Speed = speeds });
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetAll([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("Użytkownik nie jest kierowcą lub podano niewłaściwy adres email!");

            var duration = statistics.CalculateSummaryDurationPerVehicle(driver);
            var distance = statistics.CalculateSummaryDistancePerVehicle(driver);
            var speeds = statistics.CalculateSpeedsPerVehicle(driver);
            var stats = statistics.CalculateDriverStatistics(driver);
            
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
        public IActionResult GetTotalCosts([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return NotFound("Nie znaleziono pojazdu o podanym numerze vin!");

            var stats = statistics.CalculateVehicleSummaryCosts(vehicle);
            
            return Ok(stats);
            //    new CombinedDriverStatistics
            //    { 
            //        DriverData = stats, 
            //        PerVehicleData = new ChartSummaryDataPerVehicle
            //        {
            //            Distance = distance, 
            //            Duration = duration, 
            //            Speed = speeds 
            //        },
            //    }
            //);
        }

        [HttpGet]
        [Route(VEHICLE_STATISTICS_ROUTE)]
        public IActionResult GetTotal([FromQuery] string vin)
        {
            var vehicle = vehicleProvider.GetByVinNumber(vin);

            if (vehicle == null)
                return NotFound("Nie znaleziono pojazdu o podanym numerze vin!");

            var stats = statistics.CalculateVehicleSummaryStatistics(vehicle);
            
            return Ok(stats);
        }
    }
}
