using AutoMapper;
using FleetManagement.Entities.BrandModels;
using FleetManagement.Entities.Vehicles.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.VehicleDtos
{
    public class VehicleDtoBrandModelValueResolver : IValueResolver<Vehicle, VehicleDto, string>
    {
        private readonly IBrandModelProvider brandModelProvider;

        public VehicleDtoBrandModelValueResolver(IBrandModelProvider brandModelProvider)
        {
            this.brandModelProvider = brandModelProvider;
        }

        public string Resolve(Vehicle source, VehicleDto destination, string destMember, ResolutionContext context)
        {
            return brandModelProvider.GetById(source.Model.Id)?.Name ?? "";
        }
    }
}
