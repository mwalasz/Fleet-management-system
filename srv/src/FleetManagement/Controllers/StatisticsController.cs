using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Statistics;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FleetManagement.Controllers
{

    [ApiController]
    [DefaultRoute]
    [AllowAnonymous] // TODO: zmienić
    public class StatisticsController : ControllerBase
    {
        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly IStatisticsService statistics;

        public StatisticsController(IDriverAccountProvider driverAccountProvider, IStatisticsService statistics)
        {
            this.driverAccountProvider = driverAccountProvider;
            this.statistics = statistics;
        }


        [HttpGet]
        public IActionResult GetDriverStatistics([FromQuery] string mail)
        {
            var driver = driverAccountProvider.GetByMail(mail);

            if (driver == null)
                return NotFound("User is not a driver or wrong email!");

            var stats = statistics.CalculateDriverStatistics(driver);

            return Ok(stats);
        }
    }
}
