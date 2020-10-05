using System;

namespace FleetManagement.Exceptions
{
    public class InvalidCookieException : Exception
    {
        public InvalidCookieException() : base("Ciasteczko nie zawiera wymaganych informacji.")
        {
        }

        public InvalidCookieException(string message) : base(message)
        {
        }

        public InvalidCookieException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
