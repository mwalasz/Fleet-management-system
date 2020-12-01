namespace FleetManagement.Entities.Accounts.DriverAccounts.Params
{
    /// <summary>
    /// Parametry wymagane do zmiany przydzielonych pojazdów użytkownikowi.
    /// </summary>
    public class ChangeAvailableVehiclesParams
    {
        public string Mail { get; set; }
        public string[] VehiclesVin { get; set; }
    }
}
