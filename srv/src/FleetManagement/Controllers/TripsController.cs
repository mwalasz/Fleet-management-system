using AutoMapper;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Trips.Params.NewTrip;
using FleetManagement.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

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
    }
}
