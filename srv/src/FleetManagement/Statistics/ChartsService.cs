using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Entities.Vehicles.Models;
using FleetManagement.Extensions;
using FleetManagement.Statistics.Models.Charts.DataModels;
using FleetManagement.Statistics.Models.Charts.DataModels.BarChart;
using FleetManagement.Statistics.Models.Charts.DataModels.LineChart;
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

        #region Driver

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

        #endregion 

        #region Vehicle
        
        #region Costs

        public List<PieChartData> GetCostRatio(Vehicle vehicle)
        {
            var list = new List<PieChartData>();

            if (vehicle != null)
            {
                var maintenances = vehicle.GetCostOfMaintenances();
                var refuelings = vehicle.GetCostOfRefuelings();

                list.Add(new PieChartData { Name = "Naprawy", Value = maintenances.Cost });
                list.Add(new PieChartData { Name = "Tankowania", Value = refuelings.Cost });
            }

            return list;
        }

        public List<LineChartCostData> GetMonthlyCostSummary(Vehicle vehicle)
        {
            var list = new List<LineChartCostData>();

            if (vehicle != null)
            {
                var refuelingsCost = vehicle.Refuelings.GroupBy(x => new { x.Time.Month, x.Time.Year })
                    .OrderBy(x => x.Key.Year)
                    .ThenBy(x => x.Key.Month)
                    .ToDictionary(g => $"{g.Key.Month}.{g.Key.Year}", g => g.Sum(x => x.Cost));

                var maintenancesCost = vehicle.RepairsAndServices.GroupBy(x => new { x.Date.Month, x.Date.Year })
                    .OrderBy(x => x.Key.Year)
                    .ThenBy(x => x.Key.Month)
                    .ToDictionary(g => $"{g.Key.Month}.{g.Key.Year}", g => g.Sum(x => x.Cost));

                var totalCost = refuelingsCost.Concat(maintenancesCost)
                    .GroupBy(x => x.Key)
                    .ToDictionary(x => x.Key, x => x.Sum(y => y.Value));

                foreach (var month in totalCost)
                {
                    list.Add(new LineChartCostData() 
                    { 
                        Name = month.Key,
                        Sum = month.Value,
                        Maintenances = maintenancesCost.FirstOrDefault(x => x.Key == month.Key).Value,
                        Fuel = refuelingsCost.FirstOrDefault(x => x.Key == month.Key).Value
                    });
                }
            }

            return list;
        }

        #endregion 

        #endregion 
    }
}
