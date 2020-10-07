using AutoMapper;
using FleetManagement.Entities.DriverAccounts.DTO;
using FleetManagement.Entities.DriverAccounts.Models;
using FleetManagement.Entities.UserAccounts;
using FleetManagement.Entities.UserAccounts.DTO;
using FleetManagement.Entities.UserAccounts.Models;

namespace FleetManagement.AutoMapper.ValueResolvers
{
    public class DriverDtoAccountValueResolver : IValueResolver<DriverAccount, DriverAccountDto, UserAccountDto>
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IMapper mapper;

        public DriverDtoAccountValueResolver(IUserAccountProvider userAccountProvider, IMapper mapper)
        {
            this.userAccountProvider = userAccountProvider;
            this.mapper = mapper;
        }

        public UserAccountDto Resolve(DriverAccount source, DriverAccountDto destination, UserAccountDto destMember, ResolutionContext context)
        {
            var account = userAccountProvider.GetById(source.UserAccountId);

            return mapper.Map<UserAccount, UserAccountDto>(account);
        }
    }
}
