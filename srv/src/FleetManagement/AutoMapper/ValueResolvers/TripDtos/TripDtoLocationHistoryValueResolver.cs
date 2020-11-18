using AutoMapper;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Trips.Params.NewTrip;
using FleetManagement.Extensions;
using System.Collections.Generic;

namespace FleetManagement.AutoMapper.ValueResolvers.TripDtos
{
    public class TripDtoLocationHistoryValueResolver : IValueResolver<Trip, TripDto, List<Coordinates>>
    {
        public List<Coordinates> Resolve(Trip source, TripDto destination, List<Coordinates> destMember, ResolutionContext context)
        {
            return source.LocationHistory?.ConvertToCoordinates() ?? new List<Coordinates>();
        }
    }
}
