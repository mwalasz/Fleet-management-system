using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Trips.Params.NewTrip;
using FleetManagement.Entities.Vehicles;
using NHibernate;

namespace FleetManagement.Db.Repositories
{
    public class TripsRepository : DbBasicOperations<Trip>, ITripProvider
    {
        private readonly ISessionFactory sessionFactory;
        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly IVehicleProvider vehicleProvider;

        public TripsRepository(ISessionFactory sessionFactory, 
            IDriverAccountProvider driverAccountProvider,
            IVehicleProvider vehicleProvider) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
            this.driverAccountProvider = driverAccountProvider;
            this.vehicleProvider = vehicleProvider;
        }

        public bool AddNew(NewTripParams newTripParams)
        {
            var driver = driverAccountProvider.GetByMail(newTripParams.UserMail);
            var vehicle = vehicleProvider.GetByVinNumber(newTripParams.VehicleVinNumber);

            if (driver != null && vehicle != null)
            {
                try
                {
                    var trip = new Trip()
                    {
                        AverageSpeed = newTripParams.AverageSpeed,
                        MaximumSpeed = newTripParams.MaximumSpeed,
                        StartTime = newTripParams.StartTime,
                        DestinationArrivalTime = newTripParams.EndTime,
                        Distance = newTripParams.Distance,
                        TravelTime = newTripParams.TravelTime,
                        DriverAccountId = driver.Id,
                        StartPlace = "StartPlace",
                        DestinationPlace = "DestinationPlace",
                    };

                    vehicle.Trips.Add(trip);
                    Add(trip);
                    vehicleProvider.Update(vehicle);

                    return true;
                }
                catch (System.Exception)
                {
                    return false;
                }
            }

            return false;
        }
    }
}
