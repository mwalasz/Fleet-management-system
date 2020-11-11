using FleetManagement.Settings;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FleetManagement.Authentication.Tokens
{
    public static class Token
    {
        public static TokenValidationParameters GetValidationParams(JwtSettings settings)
        {
            return new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.SecretKey)),
                ValidateIssuer = true,
                ValidateLifetime = true,
                ValidateAudience = true,
                ValidIssuer = settings.Issuer,
                ValidAudience = settings.Audience,
            };
        }
    }
}
