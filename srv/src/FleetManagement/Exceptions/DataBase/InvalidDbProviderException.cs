using System;

namespace FleetManagement.Exceptions.DataBase
{
    /// <summary>
    /// Wyjątek rzucany w przypadku nieprawdiłego typu bazy danych.
    /// </summary>
    public class InvalidDbProviderException : Exception
    {
        public InvalidDbProviderException(string message) : base(message)
        {
        }

        public InvalidDbProviderException() : base("Nieprawidłowy typ bazy danych.")
        {
        }
    }
}
