using FleetManagement.Extensions;

namespace FleetManagement.Statistics.Models
{
    public class DriverStatistics
    {
        public DriverStatistics(double avgSpeedMpS, double distanceM, double durationS, double maxSpeedKmPH, int numOfTrips)
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

        public int NumberOfTrips { get; set; }

        public double TotalDistanceInMeters { get; set; }
        public double TotalDistanceInKilometers { get; set; }

        public double AverageSpeedInKilometersPerHour { get; set; }
        public double AverageSpeedInMetersPerSeconds { get; set; }

        public double MaximumSpeedInKilometersPerHour { get; set; }
        public double MaximumSpeedInMetersPerSeconds { get; set; }

        public double TotalDurationInSeconds { get; set; }
        public double TotalDurationInMinutes { get; set; }
        public double TotalDurationInHours { get; set; }
    }
}
