using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Trips;
using FleetManagement.Statistics.Models;
using System.Linq;

namespace FleetManagement.Statistics
{
    public class StatisticsService : IStatisticsService
    {
        private readonly ITripProvider tripProvider;

        public StatisticsService(ITripProvider tripProvider)
        {
            this.tripProvider = tripProvider;
        }

        public DriverStatistics CalculateDriverStatistics(DriverAccount driverAccount)
        {
            var trips = tripProvider.GetAll()
                .Where(x => x.DriverAccountId == driverAccount.Id)?.ToList();

            if (trips.Count != 0)
            {
                double avgSpeed = 0, maxSpeed = 0, distance = 0, duration = 0;

                foreach (var trip in trips)
                {
                    distance += trip.Distance;
                    duration += trip.TravelTime;
                    maxSpeed = trip.MaximumSpeed > maxSpeed ? trip.MaximumSpeed : maxSpeed;
                }

                avgSpeed = distance/duration;

                return new DriverStatistics(avgSpeed, distance, duration, maxSpeed, trips.Count)
                {
                    DriverLicenseNumber = driverAccount.DrivingLicenseNumber
                };
            }

            return new DriverStatistics() { DriverLicenseNumber = driverAccount.DrivingLicenseNumber };
        }
    }
}
