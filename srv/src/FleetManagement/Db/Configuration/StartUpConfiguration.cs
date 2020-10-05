using FleetManagement.Extensions;
using FleetManagement.Settings;
using FluentNHibernate.Cfg;
using Microsoft.Extensions.Configuration;
using NHibernate;
using NHibernate.Tool.hbm2ddl;

namespace FleetManagement.Db.Configuration
{
    public static class StartUpConfiguration
    {
        /// <summary>
        /// Tworzy sesję połączenia z bazą danych.
        /// </summary>
        /// <param name="configuration">Konfiguracja aplikacji.</param>
        /// <returns>Zwraca sesję</returns>
        public static ISessionFactory CreateSession(IConfiguration configuration)
        {
            var settings = configuration.GetSectionValues<DataBaseSettings>();

            return Fluently.Configure()
                .SetDatabaseType(settings)
                    .Mappings(m => m.FluentMappings.AddFromAssemblyOf<Program>()
                .Conventions.AddIdConvention(settings))
                .ExposeConfiguration(config => new SchemaUpdate(config).Execute(false, true))
                .BuildSessionFactory();
        }
    }
}
