using AutoMapper;
using FleetManagement.Entities.Brands;
using FleetManagement.Entities.Vehicles.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.VehicleDtos
{
    public class VehicleDtoBrandValueResolver : IValueResolver<Vehicle, VehicleDto, string>
    {
        private readonly IBrandProvider brandProvider;

        public VehicleDtoBrandValueResolver(IBrandProvider brandProvider)
        {
            this.brandProvider = brandProvider;
        }

        public string Resolve(Vehicle source, VehicleDto destination, string destMember, ResolutionContext context)
        {
            return brandProvider.GetById(source.Brand.Id)?.Name ?? "";
        }
    }
}
