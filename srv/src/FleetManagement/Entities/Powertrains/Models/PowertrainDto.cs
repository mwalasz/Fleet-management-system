namespace FleetManagement.Entities.Powertrains.Models
{
    public class PowertrainDto
    {
        public short EngineCapacity { get; set; }
        public short NumberOfCylinders { get; set; }
        public short Horsepower { get; set; }
        public short Torque { get; set; }
        public string EngineType { get; set; }
        public string DriveType { get; set; }
    }
}
