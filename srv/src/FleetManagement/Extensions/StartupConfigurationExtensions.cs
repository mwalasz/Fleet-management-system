using FleetManagement.Db.Configuration;
using FleetManagement.Db.Repositories;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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

        /// <summary>
        /// Dodaje sesję połączenia z bazą danych
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection AddDatabaseConnection(this IServiceCollection services, IConfiguration configuration)
            => services.AddSingleton(StartUpConfiguration.CreateSession(configuration));

        /// <summary>
        /// Dodaje źródła danych do DI.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddAllRepositories(this IServiceCollection services)
            => services.AddTransient<IUserAccountProvider, UserAccountsRepository>();


        /// <summary>
        /// Dodaje usługi haszowania oraz autentykacji użytkownika
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        //public static IServiceCollection AddServices(this IServiceCollection services)
        //    => services.AddTransient<IHashService, HashService>()
        //               .AddTransient<IAuthService, AuthService>();
    }
}
