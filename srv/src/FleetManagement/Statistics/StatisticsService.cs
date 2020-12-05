using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Statistics.Models;
using FleetManagement.Statistics.Models.Charts;
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

        public List<ChartData> CalculateSummaryMileagePerVehicle(DriverAccount driverAccount)
        {
            var list = new List<ChartData>();
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

                    list.Add(new ChartData { Name = vehicleName, Value = Math.Round(mileage / 1000, 2) });
                }
            }

            return list;
        }
    }
}
