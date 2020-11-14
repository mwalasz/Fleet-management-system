using AutoMapper;
using FleetManagement.Entities.Brands;
using FleetManagement.Entities.Vehicles.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.VehicleDtos
{
    public class VehicleBasicInfoDtoBrandValueResolver : IValueResolver<Vehicle, VehicleBasicInfoDto, string>
    {
        private readonly IBrandProvider brandProvider;

        public VehicleBasicInfoDtoBrandValueResolver(IBrandProvider brandProvider)
        {
            this.brandProvider = brandProvider;
        }

        public string Resolve(Vehicle source, VehicleBasicInfoDto destination, string destMember, ResolutionContext context)
        {
            return brandProvider.GetById(source.Brand.Id)?.Name ?? "";
        }
    }
}
