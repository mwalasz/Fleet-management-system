using Microsoft.Extensions.Configuration;

namespace FleetManagement.Extensions
{
    public static class ConfigurationExtensions
    {
        /// <summary>
        /// Zwraca wartości danej sekcji.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static T GetSectionValues<T>(this IConfiguration configuration)
        {
            return configuration.GetSection(typeof(T).Name).Get<T>();
        }
    }
}
