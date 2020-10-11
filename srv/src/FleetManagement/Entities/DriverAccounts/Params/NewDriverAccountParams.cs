﻿using FleetManagement.Entities.UserAccounts;

namespace FleetManagement.Entities.DriverAccounts.Params
{
    public class NewDriverAccountParams : INewAccountParams
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string DrivingLicenseNumber { get; set; }
    }
}
