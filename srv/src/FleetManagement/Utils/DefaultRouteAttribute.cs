using Microsoft.AspNetCore.Mvc;

namespace FleetManagement.Utils
{
    public class DefaultRouteAttribute : RouteAttribute
    {
        public DefaultRouteAttribute()
            : base("api/[controller]/[action]")
        {
        }
    }
}
