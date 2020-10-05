namespace FleetManagement.Settings
{
    public class DataBaseSettings
    {
        /// <summary>
        /// Nazwa wykorzystywanej bazy.
        /// </summary>
        public string NameOfActiveProvider { get; set; }

        /// <summary>
        /// Plik ".db" lub adres bazy danych.
        /// </summary>
        public string Source { get; set; }
    }
}
