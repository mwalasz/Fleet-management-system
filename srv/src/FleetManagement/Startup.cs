using AutoMapper;
using AutoWrapper;
using FleetManagement.AutoMapper.Profiles;
using FleetManagement.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace FleetManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //Dodanie zarz�dzania routingiem.
            services.AddRouting();

            //Dodanie obs�ugi kontroler�w.
            services.AddControllers();

            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<DefaultMappingProfile>();
            },
            AppDomain.CurrentDomain.GetAssemblies());

            //Dodanie us�ug:
            services.AddAllSettings(Configuration)
                .AddDatabaseConnection(Configuration)
                .AddAllRepositories()
                .AddAllSeeders()
                .AddServices();

            //Dodanie swaggera:
            services.AddSwaggerGen(s => 
            {
                s.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Title = "FleetManagement API",
                        Description = "Api documentation for app that helps managing vehicles in companies.",
                        Version = "0.0.1",
                    }
                );
            });

            //Dodanie autentykacji - logowanie.
            services.AddCookieAuthentication();

            //Dodanie autoryzacji - mo�liwo�ci u�ytkownika.
            services.AddPolicyAuthorization();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            bool development = env.IsDevelopment();

            if (development)
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseApiResponseAndExceptionWrapper(
                new AutoWrapperOptions
                {
                    ShowStatusCode = true,
                    IsDebug = development,
                    IsApiOnly = false,
                }
            );;

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "JobTracker 1.0.0");
                c.RoutePrefix = string.Empty;
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
