using AutoMapper;
using FleetManagement.Entities.DriveTypes;
using FleetManagement.Entities.Powertrains.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.PowerTrains
{
    public class PowerTrainDtoDriveTypeValueResolver : IValueResolver<Powertrain, PowertrainDto, string>
    {
        private readonly IDriveTypeProvider driveTypeProvider;

        public PowerTrainDtoDriveTypeValueResolver(IDriveTypeProvider driveTypeProvider)
        {
            this.driveTypeProvider = driveTypeProvider;
        }

        public string Resolve(Powertrain source, PowertrainDto destination, string destMember, ResolutionContext context)
        {
            return driveTypeProvider.GetById(source?.EngineType.Id).Name ?? "";
        }
    }
}
