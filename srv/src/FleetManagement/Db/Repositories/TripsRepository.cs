using FleetManagement.Db.BaseOperations;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Trips.Params.NewTrip;
using FleetManagement.Entities.Vehicles;
using FleetManagement.Extensions;
using FleetManagement.Settings;
using FleetManagement.Utils;
using Microsoft.Extensions.Options;
using NHibernate;
using RestSharp;
using System;
using System.Linq;
using System.Text.Json;

namespace FleetManagement.Db.Repositories
{
    public class TripsRepository : DbBasicOperations<Trip>, ITripProvider
    {
        private readonly GoogleSettings options;
        private readonly ISessionFactory sessionFactory;
        private readonly IDriverAccountProvider driverAccountProvider;
        private readonly IVehicleProvider vehicleProvider;

        public TripsRepository(ISessionFactory sessionFactory, 
            IDriverAccountProvider driverAccountProvider,
            IVehicleProvider vehicleProvider,
            IOptions<GoogleSettings> options) : base(sessionFactory)
        {
            this.sessionFactory = sessionFactory;
            this.driverAccountProvider = driverAccountProvider;
            this.options = options.Value;
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
                    string start = string.Empty, destination = string.Empty;
                    var locations = newTripParams.LocationHistory;
                    
                    if (locations.Length >= 2)
                    {
                        start = ConvertCoordinateToPlace(locations.First());
                        destination = ConvertCoordinateToPlace(locations.Last());
                    }

                    var trip = new Trip()
                    {
                        LocationHistory = locations.ConvertToBlob(),
                        AverageSpeed = newTripParams.AverageSpeed,
                        MaximumSpeed = newTripParams.MaximumSpeed,
                        StartTime = newTripParams.StartTime,
                        DestinationArrivalTime = newTripParams.EndTime,
                        Distance = newTripParams.Distance,
                        TravelTime = newTripParams.TravelTime,
                        DriverAccountId = driver.Id,
                        StartPlace = start,
                        DestinationPlace = destination,
                    };

                    vehicle.Trips.Add(trip);
                    vehicle.KmMileage += Convert.ToInt32(trip.Distance);
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

        private string ConvertCoordinateToPlace(Coordinates coordinate)
        {
            return GoogleGeocoding(coordinate.Latitude, coordinate.Longitude);
        }

        private string GoogleGeocoding(double latitude, double longitude)
        {
            var lat = latitude.ToString("0.0000000", System.Globalization.CultureInfo.InvariantCulture);
            var lon = longitude.ToString("0.0000000", System.Globalization.CultureInfo.InvariantCulture);
            
            var client = new RestClient(options.MapsApiUrl);
            var request = new RestRequest("maps/api/geocode/json")
                .AddParameter("latlng", $"{lat},{lon}")
                .AddParameter("sensor", "true")
                .AddParameter("result_type", "postal_code")
                .AddParameter("language", "pl")
                .AddParameter("key", options.ApiKey);

            var response = client.Get(request);

            if (response.IsSuccessful)
            {
                var json = response.Content;

                if (!string.IsNullOrEmpty(json) && !json.Contains("ZERO"))
                {
                    var results = JsonSerializer.Deserialize<GoogleGeocodeResponse>(json)?.results;

                    if (results != null && results.Length > 0)
                        return results[0].formatted_address;
                }
            }

            return string.Empty;
        }
    }
}
