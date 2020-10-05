using System;
using System.Security.Cryptography;

namespace FleetManagement.Authentication.Hashes.Passwords
{
    public class PasswordInfo
    {
        public int Iterations { get; set; }
        public HashAlgorithmName AlgorithmName { get; set; }
        public byte[] Salt { get; set; }
        public string Hash { get; set; }
        public bool IsCorrect { get; set; }

        public PasswordInfo(string hash)
        {
            var splittedHash = hash.Split(".");

            if (splittedHash.Length == 4)
            {
                Iterations = int.Parse(splittedHash[0]);
                AlgorithmName = new HashAlgorithmName(splittedHash[1]);
                Salt = Convert.FromBase64String(splittedHash[2]);
                Hash = splittedHash[3];

                IsCorrect = true;
            }
            else
            {
                IsCorrect = false;
            }
        }
    }
}
