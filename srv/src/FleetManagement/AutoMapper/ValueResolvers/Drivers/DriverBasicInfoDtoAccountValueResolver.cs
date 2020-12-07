using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.DTO;
using FleetManagement.Entities.Accounts.UserAccounts.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.Drivers
{
    public class DriverBasicInfoDtoAccountValueResolver : IValueResolver<DriverAccount, DriverAccountBasicInfoDto, UserAccountDto>
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IMapper mapper;

        public DriverBasicInfoDtoAccountValueResolver(IUserAccountProvider userAccountProvider, IMapper mapper)
        {
            this.userAccountProvider = userAccountProvider;
            this.mapper = mapper;
        }

        public UserAccountDto Resolve(DriverAccount source, DriverAccountBasicInfoDto destination, UserAccountDto destMember, ResolutionContext context)
        {
            var account = userAccountProvider.GetById(source.UserAccountId) ?? null;

            return account != null
                ? mapper.Map<UserAccount, UserAccountDto>(account)
                : null;
        }
    }
}
