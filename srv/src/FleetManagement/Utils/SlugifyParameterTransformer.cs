using Microsoft.AspNetCore.Routing;
using System.Text.RegularExpressions;

namespace FleetManagement.Utils
{
    public class SlugifyParameterTransformer : IOutboundParameterTransformer
    {
        public string TransformOutbound(object value)
        {
            return value == null ? null : Regex.Replace(value.ToString(), "([a-z])([A-Z])", "$1_$2").ToLower();
        }
    }
}
