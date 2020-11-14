using FleetManagement.Authentication;
using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.Configuration;
using FleetManagement.Db.Repositories;
using FleetManagement.Db.Seeds;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Accounts.ManagerAccounts.Models;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Entities.BrandModels;
using FleetManagement.Entities.BrandModels.Models;
using FleetManagement.Entities.Brands;
using FleetManagement.Entities.Brands.Models;
using FleetManagement.Entities.Companies;
using FleetManagement.Entities.Companies.Models;
using FleetManagement.Entities.EngineTypes;
using FleetManagement.Entities.EngineTypes.Models;
using FleetManagement.Entities.Maintenances;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Powertrains;
using FleetManagement.Entities.Powertrains.Models;
using FleetManagement.Entities.Refuelings;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Settings;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Net;
using System.Security.Claims;
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
                       .Configure<HashSettings>(configuration.GetSection(nameof(HashSettings)))
                       .Configure<JwtSettings>(configuration.GetSection(nameof(JwtSettings)));

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
            => services.AddTransient<IUserAccountProvider, UserAccountsRepository>()
                       .AddTransient<IManagerAccountProvider, ManagerAccountsRepository>()
                       .AddTransient<IDriverAccountProvider, DriverAccountsRepository>()
                       .AddTransient<IVehicleProvider, VehiclesRepository>()
                       .AddTransient<IPowertrainProvider, PowertrainsRepository>()
                       .AddTransient<IRefuelingProvider, RefuelingsRepository>()
                       .AddTransient<IMaintenanceProvider, MaintenancesRepository>()
                       .AddTransient<ICompanyProvider, CompaniesRepository>()
                       .AddTransient<ITripProvider, TripsRepository>()
                       .AddTransient<IBrandProvider, BrandsRepository>()
                       .AddTransient<IBrandModelProvider, BrandModelsRepository>()
                       .AddTransient<IEngineTypeProvider, EngineTypesRepository>();

        /// <summary>
        /// Dodaje usługi do wypełniania bazy danych.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddAllSeeders(this IServiceCollection services)
            => services.AddTransient<IDbSeeder<IUserAccountProvider, UserAccount>, DbSeeder<IUserAccountProvider, UserAccount>>()
                       .AddTransient<IDbSeeder<IManagerAccountProvider, ManagerAccount>, DbSeeder<IManagerAccountProvider, ManagerAccount>>()
                       .AddTransient<IDbSeeder<IDriverAccountProvider, DriverAccount>, DbSeeder<IDriverAccountProvider, DriverAccount>>()
                       .AddTransient<IDbSeeder<IVehicleProvider, Vehicle>, DbSeeder<IVehicleProvider, Vehicle>>()
                       .AddTransient<IDbSeeder<IPowertrainProvider, Powertrain>, DbSeeder<IPowertrainProvider, Powertrain>>()
                       .AddTransient<IDbSeeder<IRefuelingProvider, Refueling>, DbSeeder<IRefuelingProvider, Refueling>>()
                       .AddTransient<IDbSeeder<IMaintenanceProvider, Maintenance>, DbSeeder<IMaintenanceProvider, Maintenance>>()
                       .AddTransient<IDbSeeder<ICompanyProvider, Company>, DbSeeder<ICompanyProvider, Company>>()
                       .AddTransient<IDbSeeder<ITripProvider, Trip>, DbSeeder<ITripProvider, Trip>>()
                       .AddTransient<IDbSeeder<IBrandProvider, Brand>, DbSeeder<IBrandProvider, Brand>>()
                       .AddTransient<IDbSeeder<IBrandModelProvider, BrandModel>, DbSeeder<IBrandModelProvider, BrandModel>>()
                       .AddTransient<IDbSeeder<IEngineTypeProvider, EngineType>, DbSeeder<IEngineTypeProvider, EngineType>>();

        /// <summary>
        /// Dodaje usługi haszowania oraz autentykacji użytkownika
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddServices(this IServiceCollection services)
            => services.AddTransient<IHashService, HashService>()
                       .AddTransient<IAuthService, AuthService>();

        /// <summary>
        /// Dodaje autentykację z wykorzystaniem ciasteczek.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static AuthenticationBuilder AddCookieAuthentication(this IServiceCollection services)
            => services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                    .AddCookie(cfg =>
                    {
                        cfg.Events = new CookieAuthenticationEvents
                        {
                            OnValidatePrincipal = async context =>
                            {
                                var userProvider = context.HttpContext
                                    .RequestServices.GetService<IUserAccountProvider>();

                                var userId = context.Principal.GetUserId();

                                var user = userProvider.GetById(userId);

                                var claimRoles = context.Principal.Claims
                                    .Where(c => c.Type == ClaimTypes.Role)
                                    .Select(c => c.Value);

                                if (user == null || !claimRoles.Contains(user.Role))
                                {
                                    context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                                    context.RejectPrincipal();
                                }
                            },
                            OnRedirectToAccessDenied = context =>
                            {
                                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                                return Task.FromResult(0);
                            },
                            OnRedirectToLogin = context =>
                            {
                                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                                return Task.FromResult(0);
                            }
                        };
                    });

        /// <summary>
        /// Dodaje autoryzację na podstawie uprawnień.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddPolicyAuthorization(this IServiceCollection services)
            => services.AddAuthorization(cfg =>
                {
                    cfg.AddPolicy(Policy.AdminsAcces, policy =>
                        policy.RequireRole(Roles.Admin));

                    cfg.AddPolicy(Policy.ManagersAccess, policy =>
                        policy.RequireRole(Roles.Manager));

                    cfg.AddPolicy(Policy.DriversAccess, policy =>
                        policy.RequireRole(Roles.Driver));
                });
    }
}
