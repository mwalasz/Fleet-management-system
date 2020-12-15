using FleetManagement.Extensions;

namespace FleetManagement.Statistics.Models
{
    /// <summary>
    /// Statystyki opisujące jazdę.
    /// </summary>
    public class DrivingStatistics
    {
        /// <summary>
        /// Liczba tras.
        /// </summary>
        public int NumberOfTrips { get; set; }

        /// <summary>
        /// Całkowity dystans [m].
        /// </summary>
        public double TotalDistanceInMeters { get; set; }

        /// <summary>
        /// Całkowity dystans [km].
        /// </summary>
        public double TotalDistanceInKilometers { get; set; }

        /// <summary>
        /// Średnia prędkość [km/h].
        /// </summary>
        public double AverageSpeedInKilometersPerHour { get; set; }

        /// <summary>
        /// Średnia prędkość [m/s].
        /// </summary>
        public double AverageSpeedInMetersPerSeconds { get; set; }

        /// <summary>
        /// Maksymalna prędkość [km/h].
        /// </summary>
        public double MaximumSpeedInKilometersPerHour { get; set; }

        /// <summary>
        /// Maksymalna prędkość [m/s].
        /// </summary>
        public double MaximumSpeedInMetersPerSeconds { get; set; }

        /// <summary>
        /// Całkowity czas podróży [s].
        /// </summary>
        public double TotalDurationInSeconds { get; set; }

        /// <summary>
        /// Całkowity czas podróży [m].
        /// </summary>
        public double TotalDurationInMinutes { get; set; }
        
        /// <summary>
        /// Całkowity czas podróży [h].
        /// </summary>
        public double TotalDurationInHours { get; set; }

        public DrivingStatistics()
        {

        }

        public DrivingStatistics(double avgSpeedMpS, double distanceM, double durationS, double maxSpeedKmPH, int numOfTrips)
        {
            NumberOfTrips = numOfTrips;

            TotalDistanceInMeters = distanceM;
            TotalDistanceInKilometers = distanceM.FromMetersToKilometers();

            AverageSpeedInMetersPerSeconds = avgSpeedMpS;
            AverageSpeedInKilometersPerHour = avgSpeedMpS.FromMetersPerSecondToKilometersPerHour();

            MaximumSpeedInMetersPerSeconds = maxSpeedKmPH.FromKilometersPerHourToMetersPerSecond();
            MaximumSpeedInKilometersPerHour = maxSpeedKmPH;

            TotalDurationInSeconds = durationS;
            TotalDurationInMinutes = durationS.FromSecondsToMinutes();
            TotalDurationInHours = durationS.FromSecondsToHours();
        }
    }
}
