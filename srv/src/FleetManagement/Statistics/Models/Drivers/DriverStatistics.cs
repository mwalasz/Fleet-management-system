﻿namespace FleetManagement.Statistics.Models.Drivers
{
    public class DriverStatistics : DrivingStatistics
    {
        public DriverStatistics() : base() { }

        public DriverStatistics(DrivingStatistics statistics, string licenseNumber)
        {
            if (statistics != null)
            {
                this.NumberOfTrips = statistics.NumberOfTrips;
            
                this.TotalDistanceInMeters = statistics.TotalDistanceInMeters;
                this.TotalDistanceInKilometers = statistics.TotalDistanceInKilometers;

                this.AverageSpeedInKilometersPerHour = statistics.AverageSpeedInKilometersPerHour;
                this.AverageSpeedInMetersPerSeconds = statistics.AverageSpeedInMetersPerSeconds;

                this.MaximumSpeedInKilometersPerHour = statistics.MaximumSpeedInKilometersPerHour;
                this.MaximumSpeedInMetersPerSeconds = statistics.MaximumSpeedInMetersPerSeconds;

                this.TotalDurationInSeconds = statistics.TotalDurationInSeconds;
                this.TotalDurationInMinutes = statistics.TotalDurationInMinutes;
                this.TotalDurationInHours = statistics.TotalDurationInHours;
            }

            DriverLicenseNumber = licenseNumber;
        }

        public DriverStatistics(double avgSpeedMpS, double distanceM, double durationS, double maxSpeedKmPH, int numOfTrips) 
            : base(avgSpeedMpS, distanceM, durationS, maxSpeedKmPH, numOfTrips) { }

        public string DriverLicenseNumber { get; set; }
    }
}
