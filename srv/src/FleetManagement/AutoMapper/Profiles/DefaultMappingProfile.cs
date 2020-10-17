using AutoMapper;
using FleetManagement.AutoMapper.ValueResolvers;
using FleetManagement.AutoMapper.ValueResolvers.VehicleDtos;
using FleetManagement.Entities.Accounts.DriverAccounts.DTO;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.ManagerAccounts.DTO;
using FleetManagement.Entities.Accounts.ManagerAccounts.Models;
using FleetManagement.Entities.Accounts.UserAccounts.DTO;
using FleetManagement.Entities.Accounts.UserAccounts.Models;
using FleetManagement.Entities.Maintenances.Models;
using FleetManagement.Entities.Powertrains.Models;
using FleetManagement.Entities.Refuelings.Models;
using FleetManagement.Entities.Trips.Models;
using FleetManagement.Entities.Vehicles.Models;

namespace FleetManagement.AutoMapper.Profiles
{
    public class DefaultMappingProfile : Profile
    {
        public DefaultMappingProfile()
        {
            CreateMap<UserAccount, UserAccountDto>();

            CreateMap<ManagerAccount, ManagerAccountDto>()
                .ForMember(dto => dto.Account, mce => mce.MapFrom<ManagerDtoAccountValueResolver>());

            CreateMap<DriverAccount, DriverAccountDto>()
                .ForMember(dto => dto.Account, mce => mce.MapFrom<DriverDtoAccountValueResolver>());

            CreateMap<Powertrain, PowertrainDto>();
            
            CreateMap<Maintenance, MaintenanceDto>();

            CreateMap<Refueling, RefuelingDto>();

            CreateMap<Trip, TripDto>()
                .ForMember(dto => dto.DriverAccount, mce => mce.MapFrom<TripDtoDriverAccountValueResolver>());

            CreateMap<Vehicle, VehicleDto>()
                .ForMember(dto => dto.Trips, mce => mce.MapFrom<VehicleDtoTripsValueResolver>())
                .ForMember(dto => dto.RepairsAndServices, mce => mce.MapFrom<VehicleDtoRepairsValueResolver>())
                .ForMember(dto => dto.Refuelings, mce => mce.MapFrom<VehicleDtoRefuelingsValueResolver>())
                .ForMember(dto => dto.Powertrain, mce => mce.MapFrom<VehicleDtoPowertrainValueResolver>());
        }
    }
}
