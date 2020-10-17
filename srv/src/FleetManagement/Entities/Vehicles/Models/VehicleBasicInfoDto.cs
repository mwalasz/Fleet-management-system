namespace FleetManagement.Entities.Vehicles.Models
{
    public class VehicleBasicInfoDto
    {
        public string Brand { get; set; }
        public string Model { get; set; }
        public string LicensePlate { get; set; }
        public string VIN { get; set; }
        public short YearOfProduction { get; set; }
    }
}
