using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Statistics;
using FleetManagement.Statistics.Models.Charts;
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
        private readonly IStatisticsService statistics;

        public StatisticsController(IDriverAccountProvider driverAccountProvider, IStatisticsService statistics)
        {
            this.driverAccountProvider = driverAccountProvider;
            this.statistics = statistics;
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]

        public IActionResult Get([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("User is not a driver or wrong email!");

            var stats = statistics.CalculateDriverStatistics(driver);

            return Ok(stats);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetMileagePerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("User is not a driver or wrong email!");

            var stats = statistics.CalculateSummaryDistancePerVehicle(driver);

            return Ok(stats);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetDurationPerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("User is not a driver or wrong email!");

            var stats = statistics.CalculateSummaryDurationPerVehicle(driver);

            return Ok(stats);
        }

        [HttpGet]
        [Route(DRIVER_STATISTICS_ROUTE)]
        public IActionResult GetDataPerVehicleChart([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("User is not a driver or wrong email!");

            var duration = statistics.CalculateSummaryDurationPerVehicle(driver);
            var distance = statistics.CalculateSummaryDistancePerVehicle(driver);
            
            return Ok(new DataPerVehicleChart { Distance = distance, Duration = duration });
        }
    }


    public class DataPerVehicleChart
    {
        public List<ChartData> Duration { get; set; }
        public List<ChartData> Distance { get; set; }
    }
}
