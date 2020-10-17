using AutoMapper;
using FleetManagement.Entities.Maintenances;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Vehicles.Models;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.AutoMapper.ValueResolvers.VehicleDtos
{
    public class VehicleDtoRepairsValueResolver : IValueResolver<Vehicle, VehicleDto, List<MaintenanceDto>>
    {
        private readonly IMapper mapper;
        private readonly IMaintenanceProvider maintenanceProvider;

        public VehicleDtoRepairsValueResolver(IMapper mapper, IMaintenanceProvider maintenanceProvider)
        {
            this.mapper = mapper;
            this.maintenanceProvider = maintenanceProvider;
        }

        public List<MaintenanceDto> Resolve(Vehicle source, VehicleDto destination, List<MaintenanceDto> destMember, ResolutionContext context)
        {
            return source.RepairsAndServices?.Select(x => mapper.Map<Maintenance, MaintenanceDto>(x))
                                .ToList() ?? new List<MaintenanceDto>();
        }
    }
}
