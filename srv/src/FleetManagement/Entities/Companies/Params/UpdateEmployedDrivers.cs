using System.Collections.Generic;

namespace FleetManagement.Entities.Companies.Params
{
    public class UpdateEmployedDrivers
    {
        public string NIP { get; set; }
        public List<string> DriverMails { get; set; }
    }
}
