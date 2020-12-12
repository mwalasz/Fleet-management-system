using FleetManagement.Entities.Brands.Models;
using FleetManagement.Entities.EngineTypes.Models;
using System.Collections.Generic;
using System.IO;

namespace FleetManagement.Entities.Vehicles.Models
{
    public class DataForCreatingNewVehicle
    {
        public IEnumerable<BrandDto> Brands { get; set; }
        public IEnumerable<string> DriveTypes { get; set; }
        public IEnumerable<string> EngineTypes { get; set; }
    }
}
