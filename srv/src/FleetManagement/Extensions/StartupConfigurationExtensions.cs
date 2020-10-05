using FleetManagement.Db.Configuration;
using FleetManagement.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.Extensions
{
    public static class StartupConfigurationExtensions
    {
        /// <summary>
        /// Dodaje ustawienia bazy danych oraz haszowania 
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection AddAllSettings(this IServiceCollection services, IConfiguration configuration)
            => services.Configure<DataBaseSettings>(configuration.GetSection(nameof(DataBaseSettings)))
                       .Configure<HashSettings>(configuration.GetSection(nameof(HashSettings)));

        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
            => services.AddSingleton(StartUpConfiguration.CreateSession(configuration));
    }
}
