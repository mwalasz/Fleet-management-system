using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Statistics.Models.Charts.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.Statistics
{
    public class ChartsService : IChartsService
    {
        private readonly IVehicleProvider vehicleProvider;

        public ChartsService(IVehicleProvider vehicleProvider)
        {
            this.vehicleProvider = vehicleProvider;
        }

        public List<BarChartSpeedData> GetSpeedsPerVehicle(DriverAccount driverAccount)
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

        public List<PieChartData> GetSummaryDistancePerVehicle(DriverAccount driverAccount)
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

        public List<PieChartData> GetSummaryDurationPerVehicle(DriverAccount driverAccount)
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
    }
}
