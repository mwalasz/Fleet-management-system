using AutoMapper;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.AutoMapper.ValueResolvers.TripDtos
{
    public class TripDtoLocationHistoryValueResolver : IValueResolver<Trip, TripDto, List<CoordinatesDto>>
    {
        private readonly IMapper mapper;

        public TripDtoLocationHistoryValueResolver(IMapper mapper)
        {
            this.mapper = mapper;
        }

        public List<CoordinatesDto> Resolve(Trip source, TripDto destination, List<CoordinatesDto> destMember, ResolutionContext context)
        {
            var coords = source.LocationHistory?.ConvertToCoordinates();

            return coords?.Select(x => mapper.Map<Coordinates, CoordinatesDto>(x)).ToList() ?? new List<CoordinatesDto>();
        }
    }
}
