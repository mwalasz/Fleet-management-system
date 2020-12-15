using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Statistics.Models;
using FleetManagement.Statistics.Models.Charts.DataModels;
using FleetManagement.Statistics.Models.Drivers;
using FleetManagement.Statistics.Models.Vehicles;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.Statistics
{
    public class StatisticsService : IStatisticsService
    {
        private readonly ITripProvider tripProvider;
        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly IVehicleProvider vehicleProvider;

        public StatisticsService(ITripProvider tripProvider, IDriverAccountProvider driverAccountProvider, IVehicleProvider vehicleProvider)
        {
            this.tripProvider = tripProvider;
            this.driverAccountProvider = driverAccountProvider;
            this.vehicleProvider = vehicleProvider;
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
                double maintenances = 0, refuelings = 0, total = 0;
                int numOfMaintenances = 0, numOfRefuelings = 0;

                foreach(var refuel in vehicle.Refuelings)
                {
                    refuelings += refuel.Cost;
                    numOfRefuelings++;
                }

                foreach(var maintenance in vehicle.RepairsAndServices)
                {
                    maintenances += maintenance.Cost;
                    numOfMaintenances++;
                }

                total += maintenances + refuelings;

                return new VehicleSummaryCosts() 
                { 
                    TotalCost = total,
                    MaintenancesCost = maintenances,
                    MaintenancesAverageCost = maintenances / numOfMaintenances,
                    MaintenancesNumber = numOfMaintenances,
                    RefuelingsCost = refuelings,
                    RefuelingsAverageCost = refuelings / numOfRefuelings,
                    RefuelingsNumber = numOfRefuelings,
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
