using AutoMapper;
using FleetManagement.Entities.Refuelings;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Vehicles.Models;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.AutoMapper.ValueResolvers.VehicleDtos
{
    public class VehicleDtoRefuelingsValueResolver : IValueResolver<Vehicle, VehicleDto, List<RefuelingDto>>
    {
        private readonly IMapper mapper;
        private readonly IRefuelingProvider refuelingProvider;

        public VehicleDtoRefuelingsValueResolver(IMapper mapper, IRefuelingProvider refuelingProvider)
        {
            this.mapper = mapper;
            this.refuelingProvider = refuelingProvider;
        }

        public List<RefuelingDto> Resolve(Vehicle source, VehicleDto destination, List<RefuelingDto> destMember, ResolutionContext context)
        {
            return source.Refuelings?.Select(x => mapper.Map<Refueling, RefuelingDto>(x))
                    .ToList() ?? new List<RefuelingDto>();
        }
    }
}
