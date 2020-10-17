using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts.DTO;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.DTO;
using FleetManagement.Entities.Accounts.UserAccounts.Models;

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
            var account = userAccountProvider.GetById(source.UserAccountId) ?? null;

            return account != null
                ? mapper.Map<UserAccount, UserAccountDto>(account)
                : null;
        }
    }
}
