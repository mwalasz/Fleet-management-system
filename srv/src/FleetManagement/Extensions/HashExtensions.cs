using FleetManagement.Settings;
using System;
using System.Linq;
using System.Security.Cryptography;

namespace FleetManagement.Extensions
{
    public static class HashExtensions
    {
        public static string CreateHash(this Rfc2898DeriveBytes rfc, HashSettings settings)
        {
            var hash = Convert.ToBase64String(rfc.GetBytes(settings.KeySize));
            var salt = Convert.ToBase64String(rfc.Salt);

            return $"{settings.Iterations}.{settings.AlgorithmName}.{salt}.{hash}";

        }

        public static bool IsEqualToHash(this string original, Rfc2898DeriveBytes rfc)
        {
            var originalBytes = Convert.FromBase64String(original);
            var newBytes = rfc.GetBytes(Convert.FromBase64String(original).Length);

            return newBytes.SequenceEqual(originalBytes);
        }
    }
}
