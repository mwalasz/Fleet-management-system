using AutoMapper;
using FleetManagement.Entities.Powertrains;
using FleetManagement.Entities.Powertrains.Models;
using FleetManagement.Entities.Vehicles.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.VehicleDtos
{
    public class VehicleDtoPowertrainValueResolver : IValueResolver<Vehicle, VehicleDto, PowertrainDto>
    {
        private readonly IMapper mapper;
        private readonly IPowertrainProvider powertrainProvider;

        public VehicleDtoPowertrainValueResolver(IMapper mapper, IPowertrainProvider powertrainProvider)
        {
            this.mapper = mapper;
            this.powertrainProvider = powertrainProvider;
        }

        public PowertrainDto Resolve(Vehicle source, VehicleDto destination, PowertrainDto destMember, ResolutionContext context)
        {
            var powertrain = powertrainProvider.GetById(source.Powertrain.Id) ?? null;

            return powertrain != null 
                ? mapper.Map<Powertrain, PowertrainDto>(powertrain)
                : null;
        }
    }
}
