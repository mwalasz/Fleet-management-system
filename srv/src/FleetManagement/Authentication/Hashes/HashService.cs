using FleetManagement.Authentication.Hashes.Passwords;
using FleetManagement.Extensions;
using FleetManagement.Settings;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;

namespace FleetManagement.Authentication.Hashes
{
    public class HashService : IHashService
    {
        private readonly IConfiguration configuration;
        private readonly HashSettings settings;

        public HashService(IConfiguration configuration)
        {
            this.configuration = configuration;
            settings = configuration.GetSectionValues<HashSettings>();
        }

        public bool CompareHashes(string password, string hash)
        {
            var info = new PasswordInfo(hash);

            if (!info.IsCorrect)
                return false;

            using var rfc = new Rfc2898DeriveBytes(password, info.Salt, info.Iterations, info.AlgorithmName);

            return info.Hash.IsEqualToHash(rfc);
        }

        public string GenerateHash(string password)
        {
            var hashAlgorithm = new HashAlgorithmName(settings.AlgorithmName);
            using var rfc = new Rfc2898DeriveBytes(password, settings.SaltSize, settings.Iterations, hashAlgorithm);

            return rfc.CreateHash(settings);
        }
    }
}
