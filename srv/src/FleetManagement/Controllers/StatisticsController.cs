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
    [AllowAnonymous] // TODO: zmienić
    public class StatisticsControllerController : ControllerBase
    {
        public StatisticsControllerController()
        {

        }

        [HttpGet]
        public void GetDriverStatistics([FromQuery] string mail)
        {

        }
    }
}
