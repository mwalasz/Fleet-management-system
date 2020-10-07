using AutoMapper;
using FleetManagement.AutoMapper.ValueResolvers;
using FleetManagement.Entities.DriverAccounts.DTO;
using FleetManagement.Entities.DriverAccounts.Models;
using FleetManagement.Entities.ManagerAccounts.DTO;
using FleetManagement.Entities.ManagerAccounts.Models;
using FleetManagement.Entities.UserAccounts.DTO;
using FleetManagement.Entities.UserAccounts.Models;

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
        }
    }
}
