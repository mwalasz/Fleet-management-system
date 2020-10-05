using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FleetManagement.Db;
using FleetManagement.Db.Conventions;
using FleetManagement.Exceptions.DataBase;
using FleetManagement.Settings;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;

namespace FleetManagement.Extensions
{
    public static class DataBaseExtensions
    {
        public static FluentConfiguration SetDatabaseType(this FluentConfiguration configuration, DataBaseSettings settings)
        {
            var dbProvider = settings.GetActiveDatabaseProvider();

            return dbProvider switch
            {
                DbProvider.SQLite => configuration.Database(SQLiteConfiguration.Standard.UsingFile(settings.Source)),
                _ => throw new InvalidDbProviderException(),
            };
        }

        /// <summary>
        /// Dodaje konwencję odnośnie tworzenia identyfikatorów.
        /// </summary>
        /// <param name="convention"></param>
        /// <param name="settings"></param>
        /// <returns></returns>
        public static FluentMappingsContainer AddIdConvention(this SetupConventionFinder<FluentMappingsContainer> convention, DataBaseSettings settings)
        {
            var dbProvider = settings.GetActiveDatabaseProvider();

            return dbProvider switch
            {
                DbProvider.SQLite => convention.Add<IncrementIdConvention>(),
                _ => throw new InvalidDbProviderException(),
            };
        }

        /// <summary>
        /// Zwraca używany rodzaj bazy danych.
        /// </summary>
        /// <param name="settings"></param>
        /// <returns></returns>
        public static DbProvider GetActiveDatabaseProvider(this DataBaseSettings settings)
        {
            if (settings.NameOfActiveProvider.Equals(DbProvider.SQLite.GetName(), StringComparison.InvariantCultureIgnoreCase))
            {
                return DbProvider.SQLite;
            }
            else throw new InvalidDbProviderException();
        }
    }
}
