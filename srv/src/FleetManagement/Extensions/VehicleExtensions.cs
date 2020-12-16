using FleetManagement.Entities.Vehicles.Models;

namespace FleetManagement.Extensions
{
    public static class VehicleExtensions
    {
        public static CostAndCount GetCostOfMaintenances(this Vehicle vehicle)
        {
            double cost = 0;
            int count = 0;

            foreach(var maintenance in vehicle.RepairsAndServices)
            {
                cost += maintenance.Cost;
                count++;
            }

            return new CostAndCount() { Cost = cost, Average = CalcAverage(cost, count), Count = count };
        }

        public static CostAndCount GetCostOfRefuelings(this Vehicle vehicle)
        {
            double cost = 0;
            int count = 0;

            foreach(var refuel in vehicle.Refuelings)
            {
                cost += refuel.Cost;
                count++;
            }

            return new CostAndCount() { Cost = cost, Average = CalcAverage(cost, count), Count = count };
        }

        private static double CalcAverage(double cost, double count)
        {
            return count >= 1 ? cost / count : 0;
        }

        public class CostAndCount
        {
            public double Cost { get; set; }
            public double Average { get; set; }
            public int Count { get; set; }
        }
    }
}
