using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts.DTO;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Vehicles.Models;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.AutoMapper.ValueResolvers.Drivers
{
    public class DriverDtoVehiclesValueResolver : IValueResolver<DriverAccount, DriverAccountDto, List<VehicleBasicInfoDto>>
    {
        private readonly IMapper mapper;

        public DriverDtoVehiclesValueResolver(IMapper mapper)
        {
            this.mapper = mapper;
        }

        public List<VehicleBasicInfoDto> Resolve(DriverAccount source, DriverAccountDto destination, List<VehicleBasicInfoDto> destMember, ResolutionContext context)
        {
            return source.Vehicles?.Select(x => mapper.Map<Vehicle, VehicleBasicInfoDto>(x))
                    .ToList() ?? new List<VehicleBasicInfoDto>();
        }
    }
}
