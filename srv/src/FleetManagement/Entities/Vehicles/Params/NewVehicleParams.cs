using System;

namespace FleetManagement.Entities.Vehicles.Params
{
    public class NewVehicleParams
    {
        public string CompanyManagerMail { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string LicensePlate { get; set; }
        public string VIN { get; set; }
        public int KmMileage { get; set; }
        public int CurbWeight { get; set; }
        public short YearOfProduction { get; set; }
        public DateTime TechnicalInspectionDate { get; set; }
        public DateTime InsuranceInspectionDate { get; set; }

        //Powertrain:

        public short EngineCapacity { get; set; }
        public short Horsepower { get; set; }
        public short Torque{ get; set; }
        public short CylinderNumber{ get; set; }
        public string EngineType { get; set; }
        public string DriveType { get; set; }
    }
}
