using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Statistics;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

            var stats = statistics.CalculateSummaryMileagePerVehicle(driver);

            return Ok(stats);
        }
    }
}
