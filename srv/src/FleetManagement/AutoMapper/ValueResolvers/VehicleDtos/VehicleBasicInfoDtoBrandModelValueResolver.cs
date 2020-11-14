using AutoMapper;
using FleetManagement.Entities.BrandModels;
using FleetManagement.Entities.Vehicles.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.VehicleDtos
{
    public class VehicleBasicInfoDtoBrandModelValueResolver : IValueResolver<Vehicle, VehicleBasicInfoDto, string>
    {
        private readonly IBrandModelProvider brandModelProvider;

        public VehicleBasicInfoDtoBrandModelValueResolver(IBrandModelProvider brandModelProvider)
        {
            this.brandModelProvider = brandModelProvider;
        }

        public string Resolve(Vehicle source, VehicleBasicInfoDto destination, string destMember, ResolutionContext context)
        {
            return brandModelProvider.GetById(source.Model.Id)?.Name ?? "";
        }
    }
}
