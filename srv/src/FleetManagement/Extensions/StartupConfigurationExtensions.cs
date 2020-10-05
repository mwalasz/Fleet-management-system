using FleetManagement.Authentication;
using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Policies;
using FleetManagement.Db.Configuration;
using FleetManagement.Db.Repositories;
using FleetManagement.Db.Seeds;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.Models;
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
        /// Dodaje usługi do wypełniania bazy danych.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddAllSeeders(this IServiceCollection services)
            => services.AddTransient<IDbSeeder<IUserAccountProvider, UserAccount>, DbSeeder<IUserAccountProvider, UserAccount>>();

        /// <summary>
        /// Dodaje usługi haszowania oraz autentykacji użytkownika
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddServices(this IServiceCollection services)
            => services.AddTransient<IHashService, HashService>()
                       .AddTransient<IAuthService, AuthService>();

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

        public static IServiceCollection AddPolicyAuthorization(this IServiceCollection services)
            => services.AddAuthorization(cfg =>
                {
                    cfg.AddPolicy(Policy.Administrator, policy =>
                        policy.RequireRole(Roles.Admin));
                });
    }
}
