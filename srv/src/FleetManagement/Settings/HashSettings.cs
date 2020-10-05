namespace FleetManagement.Settings
{
    public class HashSettings
    {
        public int KeySize { get; set; }
        public int SaltSize { get; set; }
        public int Iterations { get; set; }
        public string AlgorithmName { get; set; }
    }
}
