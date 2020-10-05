using FleetManagement.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

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

            //Dodanie obs³ugi kontrolerów.
            services.AddControllers();

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

            //Dodanie autentykacji - logowanie.
            services.AddCookieAuthentication();

            //Dodanie autoryzacji - mo¿liwoœci u¿ytkownika.
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
