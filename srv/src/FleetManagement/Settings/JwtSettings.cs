namespace FleetManagement.Settings
{
    public class JwtSettings
    {
        public string SecretKey { get; set; }
        public int ExpirationTime { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }
}
