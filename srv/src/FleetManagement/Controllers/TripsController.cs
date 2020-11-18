using AutoMapper;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Trips.Params.NewTrip;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace FleetManagement.Controllers
{
    [ApiController]
    [DefaultRoute]
    [AllowAnonymous]
    public class TripsController : ControllerBase
    {
        private readonly ITripProvider tripProvider;
        private readonly IMapper mapper;

        public TripsController(ITripProvider tripProvider, IMapper mapper)
        {
            this.tripProvider = tripProvider;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<TripDto> GetAll()
        {
            return tripProvider.GetAll()
                .Select(x => mapper.Map<Trip, TripDto>(x));
        }

        [HttpPost]
        public IActionResult Add([FromBody] NewTripParams newTrip)
        {
            var successfullAdd = tripProvider.AddNew(newTrip);

            return Ok(successfullAdd ? "" : "Nie udało się dodać nowej trasy.");
        }


        [HttpGet]
        public GoogleGeocodeResponse GetLocation()
        {
            var latitude = "50.2326726";
            var longitude = "18.9619207";
            
            var client = new RestClient($"https://maps.googleapis.com");
            var request = new RestRequest("maps/api/geocode/json")
                .AddParameter("latlng", $"{latitude},{longitude}")
                .AddParameter("sensor", "true")
                .AddParameter("result_type", "postal_code")
                .AddParameter("language", "pl")
                .AddParameter("key", "AIzaSyDaOHc_qSM6ZE4sP4GMTEgFonWOP478R-U");

            var response = client.Get(request);
            var json = response.IsSuccessful ? response.Content : "";

            return JsonSerializer.Deserialize<GoogleGeocodeResponse>(json);
        }
    }
}
