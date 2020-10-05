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
            //Dodanie zarządzania routingiem.
            services.AddRouting();

            //Dodanie obsługi kontrolerów.
            services.AddControllers();

            //Dodanie usług:
            services.AddAllSettings(Configuration)
                .AddDatabaseConnection(Configuration);
                //.AddServices();
            
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
            //services.AddAuthenticationWithCookies();

            //Dodanie autoryzacji - możliwości użytkownika.
            //services.AddAuthorizationWithPolicies();
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
