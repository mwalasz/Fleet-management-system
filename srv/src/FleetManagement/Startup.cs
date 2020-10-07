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
            //Dodanie zarządzania routingiem.
            services.AddRouting();

            //Dodanie obsługi kontrolerów.
            services.AddControllers();

            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<DefaultMappingProfile>();
            },
            AppDomain.CurrentDomain.GetAssemblies());

            //Dodanie usług:
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

            //Dodanie autoryzacji - możliwości użytkownika.
            services.AddPolicyAuthorization();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "FleetManagement");
                c.RoutePrefix = string.Empty;
            });

            app.UseApiResponseAndExceptionWrapper();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
