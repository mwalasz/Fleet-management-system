using FleetManagement.Exceptions.DataBase;

namespace FleetManagement.Db
{
    /// <summary>
    /// Dostępne typy baz danych.
    /// </summary>
    public enum DbProvider
    {
        SQLite
    }

    public static partial class DbProviderNames
    {
        public static string GetName(this DbProvider dbProvider)
        {
            return dbProvider switch
            {
                DbProvider.SQLite => "sqlite",
                _ => throw new InvalidDbProviderException(),
            };
        }
    }
}
