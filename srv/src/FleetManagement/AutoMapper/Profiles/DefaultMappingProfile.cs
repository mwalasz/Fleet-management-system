﻿using AutoMapper;
using FleetManagement.Authentication.Models.Results;
using FleetManagement.AutoMapper.ValueResolvers;
using FleetManagement.AutoMapper.ValueResolvers.Drivers;
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

            CreateMap<AuthenticationResult, AuthenticationResultDto>()
                .ForMember(dto => dto.FirstName, mce => mce.MapFrom(q => q.UserAccount.FirstName))
                .ForMember(dto => dto.LastName, mce => mce.MapFrom(q => q.UserAccount.LastName))
                .ForMember(dto => dto.Email, mce => mce.MapFrom(q => q.UserAccount.Email))
                .ForMember(dto => dto.PhoneNumber, mce => mce.MapFrom(q => q.UserAccount.PhoneNumber))
                .ForMember(dto => dto.Role, mce => mce.MapFrom(q => q.UserAccount.Role));


            CreateMap<ManagerAccount, ManagerAccountDto>()
                .ForMember(dto => dto.Account, mce => mce.MapFrom<ManagerDtoAccountValueResolver>());

            CreateMap<DriverAccount, DriverAccountDto>()
                .ForMember(dto => dto.Account, mce => mce.MapFrom<DriverDtoAccountValueResolver>())
                .ForMember(dto => dto.Vehicles, mce => mce.MapFrom<DriverDtoVehiclesValueResolver>());
            CreateMap<DriverAccount, DriverTripInfoDto>()
                .ForMember(dto => dto.Account, mce => mce.MapFrom<DriverTripInfoDtoAccountValueResolver>());

            CreateMap<Powertrain, PowertrainDto>()
                .ForMember(dto => dto.EngineType, mce => mce.MapFrom<PowerTrainDtoEngineTypeValueResolver>());
            
            CreateMap<Maintenance, MaintenanceDto>();

            CreateMap<Refueling, RefuelingDto>();

            CreateMap<Trip, TripDto>()
                .ForMember(dto => dto.DriverAccount, mce => mce.MapFrom<TripDtoDriverAccountValueResolver>());

            CreateMap<Vehicle, VehicleDto>()
                .ForMember(dto => dto.Brand, mce => mce.MapFrom<VehicleDtoBrandValueResolver>())
                .ForMember(dto => dto.Model, mce => mce.MapFrom<VehicleDtoBrandModelValueResolver>())
                .ForMember(dto => dto.Trips, mce => mce.MapFrom<VehicleDtoTripsValueResolver>())
                .ForMember(dto => dto.RepairsAndServices, mce => mce.MapFrom<VehicleDtoRepairsValueResolver>())
                .ForMember(dto => dto.Refuelings, mce => mce.MapFrom<VehicleDtoRefuelingsValueResolver>())
                .ForMember(dto => dto.Powertrain, mce => mce.MapFrom<VehicleDtoPowertrainValueResolver>());
            CreateMap<Vehicle, VehicleBasicInfoDto>()
                .ForMember(dto => dto.Brand, mce => mce.MapFrom<VehicleBasicInfoDtoBrandValueResolver>())
                .ForMember(dto => dto.Model, mce => mce.MapFrom<VehicleBasicInfoDtoBrandModelValueResolver>());
        }
    }
}
