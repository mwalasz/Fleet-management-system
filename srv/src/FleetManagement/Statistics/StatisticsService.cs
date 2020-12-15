using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Extensions;
using FleetManagement.Statistics.Models;
using FleetManagement.Statistics.Models.Drivers;
using FleetManagement.Statistics.Models.Vehicles;
using System.Collections.Generic;
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

        public DriverStatistics CalculateDriverDrivingData(DriverAccount driverAccount)
        {
            var trips = tripProvider.GetAll()
                .Where(x => x.DriverAccountId == driverAccount.Id)?.ToList();

            return new DriverStatistics(CalculateDrivingStatistics(trips), driverAccount.DrivingLicenseNumber);
        }

        public VehicleSummaryCosts CalculateVehicleCostsData(Vehicle vehicle)
        {
            if (vehicle != null)
            {
                var maintenances = vehicle.GetCostOfMaintenances();
                var refuelings = vehicle.GetCostOfRefuelings();

                return new VehicleSummaryCosts() 
                { 
                    TotalCost = maintenances.Cost + refuelings.Cost,
                    MaintenancesCost = maintenances.Cost,
                    MaintenancesAverageCost = maintenances.Average,
                    MaintenancesNumber = maintenances.Count,
                    RefuelingsCost = refuelings.Cost,
                    RefuelingsAverageCost = refuelings.Average,
                    RefuelingsNumber = refuelings.Count,
                };
            }

            return null;
        }

        public VehicleStatistics CalculateVehicleDrivingData(Vehicle vehicle)
        {
            if (vehicle != null)
                return new VehicleStatistics(CalculateDrivingStatistics(vehicle.Trips));

            return null;
        }

        private DrivingStatistics CalculateDrivingStatistics(IEnumerable<Trip> trips)
        {
            var tripsCount = trips.ToList().Count;

            if (tripsCount != 0)
            {
                double avgSpeed = 0, maxSpeed = 0, distance = 0, duration = 0;

                foreach (var trip in trips)
                {
                    distance += trip.Distance;
                    duration += trip.TravelTime;
                    maxSpeed = trip.MaximumSpeed > maxSpeed ? trip.MaximumSpeed : maxSpeed;
                }

                avgSpeed = distance / duration;
                
                return new DrivingStatistics(avgSpeed, distance, duration, maxSpeed, tripsCount);
            }

            return null;
        }
    }
}
