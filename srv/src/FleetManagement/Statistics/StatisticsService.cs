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

        public DriverStatistics CalculateDriverStatistics(DriverAccount driverAccount)
        {
            var trips = tripProvider.GetAll()
                .Where(x => x.DriverAccountId == driverAccount.Id)?.ToList();

            return new DriverStatistics(CalculateDrivingStatistics(trips), driverAccount.DrivingLicenseNumber);
        }

        public List<BarChartSpeedData> CalculateSpeedsPerVehicle(DriverAccount driverAccount)
        {
            var list = new List<BarChartSpeedData>();
            var userVehicles = driverAccount.Vehicles;

            if (userVehicles.Count != 0)
            {
                foreach (var vehicle in userVehicles)
                {
                    var vehicleData = vehicleProvider.GetById(vehicle.Id);

                    var vehicleName = vehicleProvider.GetVehicleName(vehicleData.VIN);
                    var driverTrips = vehicleData.Trips.Where(x => x.DriverAccountId == driverAccount.Id)?.ToList();
                    
                    double avg = 0;
                    double max = 0;

                    foreach (var trip in driverTrips)
                    {
                        avg += trip.AverageSpeed;

                        if (trip.MaximumSpeed > max)
                            max = trip.MaximumSpeed;
                    }

                    if (driverTrips.Count >= 1)
                        avg /= driverTrips.Count;

                    list.Add(new BarChartSpeedData { Name = vehicleName, AverageSpeed = Math.Round(avg, 2), MaxSpeed = Math.Round(max, 2) });
                }
            }

            return list;
        }

        public List<PieChartData> CalculateSummaryDistancePerVehicle(DriverAccount driverAccount)
        {
            var list = new List<PieChartData>();
            var userVehicles = driverAccount.Vehicles;

            if (userVehicles.Count != 0)
            {
                foreach (var vehicle in userVehicles)
                {
                    var vehicleData = vehicleProvider.GetById(vehicle.Id);

                    var vehicleName = vehicleProvider.GetVehicleName(vehicleData.VIN);
                    double mileage = 0;
                    var driverTrips = vehicleData.Trips.Where(x => x.DriverAccountId == driverAccount.Id)?.ToList();

                    foreach (var trip in driverTrips)
                        mileage += trip.Distance;

                    list.Add(new PieChartData { Name = vehicleName, Value = Math.Round(mileage / 1000, 2) });
                }
            }

            return list;
        }

        public List<PieChartData> CalculateSummaryDurationPerVehicle(DriverAccount driverAccount)
        {
            var list = new List<PieChartData>();
            var userVehicles = driverAccount.Vehicles;

            if (userVehicles.Count != 0)
            {
                foreach (var vehicle in userVehicles)
                {
                    var vehicleData = vehicleProvider.GetById(vehicle.Id);

                    var vehicleName = vehicleProvider.GetVehicleName(vehicleData.VIN);
                    double duration = 0;
                    var driverTrips = vehicleData.Trips.Where(x => x.DriverAccountId == driverAccount.Id)?.ToList();

                    foreach (var trip in driverTrips)
                        duration += trip.TravelTime;

                    list.Add(new PieChartData { Name = vehicleName, Value = duration });
                }
            }

            return list;
        }

        public VehicleSummaryCosts CalculateVehicleSummaryCosts(Vehicle vehicle)
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

        public VehicleStatistics CalculateVehicleSummaryStatistics(Vehicle vehicle)
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
