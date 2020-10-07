namespace FleetManagement.Authentication.Policies
{
    public static class Policy
    {
        public const string AdminsAcces = Roles.Admin;
        public const string ManagersAccess = Roles.Manager;
        public const string DriversAccess = Roles.Driver;
    }

    public static class Roles
    {
        public const string Admin = "admin";
        public const string Manager = "manager";
        public const string Driver = "driver";
    }
}
