using AutoMapper;
using FleetManagement.Entities.Companies.Models;
using FleetManagement.Entities.Vehicles.Models;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.AutoMapper.ValueResolvers.Companies
{
    public class CompanyDtoVehiclesValueResolver : IValueResolver<Company, CompanyDto, List<VehicleBasicInfoDto>>
    {
        private readonly IMapper mapper;

        public CompanyDtoVehiclesValueResolver(IMapper mapper)
        {
            this.mapper = mapper;
        }

        public List<VehicleBasicInfoDto> Resolve(Company source, CompanyDto destination, List<VehicleBasicInfoDto> destMember, ResolutionContext context)
        {
            return source.Vehicles?.Select(x => mapper.Map<Vehicle, VehicleBasicInfoDto>(x)).ToList() ?? new List<VehicleBasicInfoDto>();
        }
    }
}
