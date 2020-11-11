using FleetManagement.Authentication.Hashes;
using FleetManagement.Authentication.Models;
using FleetManagement.Authentication.Models.Results;
using FleetManagement.Authentication.Tokens;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace FleetManagement.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IHashService hashService;
        private readonly JwtSettings options;

        public AuthService(IUserAccountProvider userAccountProvider, 
            IHashService hashService,
            IOptions<JwtSettings> options)
        {
            this.userAccountProvider = userAccountProvider;
            this.hashService = hashService;
            this.options = options.Value;
        }

        public AuthenticationResult Authenticate(AuthenticationParams request)
        {
            var user = userAccountProvider.GetAll()
                .SingleOrDefault(x => x.Email == request.Email && hashService.CompareHashes(request.Password, x.PasswordHash));

            if (user == null) return null;

            var token = GenerateToken(user);

            return new AuthenticationResult { UserAccount = user, Token = token };
        }

        public string GenerateToken(UserAccount user)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(options.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.Email, user.Email), 
                    new Claim(ClaimTypes.Role, user.Role), 
                }),
                Audience = options.Audience,
                Issuer = options.Issuer,
                Expires = DateTime.UtcNow.AddDays(options.ExpirationTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            return handler.WriteToken(handler.CreateToken(tokenDescriptor));
        }

        public UserAccount ValidateToken(string token)
        {
            var validator = new JwtSecurityTokenHandler();
            var validationParameters = Token.GetValidationParams(options);

            if (validator.CanReadToken(token))
            {
                ClaimsPrincipal principal;
                try
                {
                    principal = validator.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

                    if (principal.HasClaim(c => c.Type == ClaimTypes.Email))
                    {
                        var userMail = principal.Claims.Where(c => c.Type == ClaimTypes.Email).First().Value;
                        return userAccountProvider.GetByMail(userMail);
                    }
                }
                catch (Exception)
                {
                    return null;
                }
            }

            return null;
        }
    }
}
