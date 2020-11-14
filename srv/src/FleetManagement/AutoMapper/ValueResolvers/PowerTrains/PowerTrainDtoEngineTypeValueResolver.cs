using AutoMapper;
using FleetManagement.Entities.EngineTypes;
using FleetManagement.Entities.Powertrains.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.PowerTrains
{
    public class PowerTrainDtoEngineTypeValueResolver : IValueResolver<Powertrain, PowertrainDto, string>
    {
        private readonly IEngineTypeProvider engineTypeProvider;

        public PowerTrainDtoEngineTypeValueResolver(IEngineTypeProvider engineTypeProvider)
        {
            this.engineTypeProvider = engineTypeProvider;
        }

        public string Resolve(Powertrain source, PowertrainDto destination, string destMember, ResolutionContext context)
        {
            return engineTypeProvider.GetById(source?.EngineType.Id).Name ?? "";
        }
    }
}
