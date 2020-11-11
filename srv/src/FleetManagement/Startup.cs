using AutoMapper;
using AutoWrapper;
using FleetManagement.Authentication.Utils;
using FleetManagement.AutoMapper.Profiles;
using FleetManagement.Extensions;
using FleetManagement.Settings;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;

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
            //Dodanie zarz¹dzania routingiem.
            services.AddRouting();

            //Dodanie obs³ugi CORS.
            services.AddCors();

            //Dodanie obs³ugi kontrolerów.
            services.AddControllers();

            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<DefaultMappingProfile>();
            },
            AppDomain.CurrentDomain.GetAssemblies());

            //Dodanie us³ug:
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


            //Dodanie autoryzacji - mo¿liwoœci u¿ytkownika.
            var jwtSettings = Configuration.GetSection("JwtSettings").Get<JwtSettings>();
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = Token.GetValidationParams(jwtSettings);
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();

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

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
