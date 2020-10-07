using AutoMapper;
using FleetManagement.Entities.ManagerAccounts.DTO;
using FleetManagement.Entities.ManagerAccounts.Models;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.DTO;
using FleetManagement.Entities.UserAccounts.Models;

namespace FleetManagement.AutoMapper.ValueResolvers
{
    public class ManagerDtoAccountValueResolver : IValueResolver<ManagerAccount, ManagerAccountDto, UserAccountDto>
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IMapper mapper;

        public ManagerDtoAccountValueResolver(IUserAccountProvider userAccountProvider, IMapper mapper)
        {
            this.userAccountProvider = userAccountProvider;
            this.mapper = mapper;
        }

        public UserAccount Resolve(ManagerAccount source, ManagerAccountDto destination, UserAccount destMember, ResolutionContext context)
        {
            return userAccountProvider.GetById(source.UserAccountId);
        }

        public UserAccountDto Resolve(ManagerAccount source, ManagerAccountDto destination, UserAccountDto destMember, ResolutionContext context)
        {
            var account = userAccountProvider.GetById(source.UserAccountId);
            
            return mapper.Map<UserAccount, UserAccountDto>(account);
        }
    }
}
