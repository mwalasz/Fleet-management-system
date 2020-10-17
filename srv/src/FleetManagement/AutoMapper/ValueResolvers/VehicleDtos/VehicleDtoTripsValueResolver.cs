using AutoMapper;
using FleetManagement.Entities.Trips;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagement.AutoMapper.ValueResolvers.VehicleDtos
{
    public class VehicleDtoTripsValueResolver : IValueResolver<Vehicle, VehicleDto, List<TripDto>>
    {
        private readonly IMapper mapper;
        private readonly ITripProvider tripProvider;

        public VehicleDtoTripsValueResolver(IMapper mapper, ITripProvider tripProvider)
        {
            this.mapper = mapper;
            this.tripProvider = tripProvider;
        }

        public List<TripDto> Resolve(Vehicle source, VehicleDto destination, List<TripDto> destMember, ResolutionContext context)
        {
            return source.Trips?.Select(x => mapper.Map<Trip, TripDto>(x))
                                .ToList() ?? new List<TripDto>();
        }
    }
}
