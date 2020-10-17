using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Accounts.UserAccounts;
using FleetManagement.Entities.Accounts.UserAccounts.DTO;
using FleetManagement.Entities.Accounts.UserAccounts.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.Drivers
{
    public class DriverTripInfoDtoAccountValueResolver : IValueResolver<DriverAccount, DriverTripInfoDto, UserAccountDto>
    {
        private readonly IUserAccountProvider userAccountProvider;
        private readonly IMapper mapper;

        public DriverTripInfoDtoAccountValueResolver(IUserAccountProvider userAccountProvider, IMapper mapper)
        {
            this.userAccountProvider = userAccountProvider;
            this.mapper = mapper;
        }

        public UserAccountDto Resolve(DriverAccount source, DriverTripInfoDto destination, UserAccountDto destMember, ResolutionContext context)
        {
            var account = userAccountProvider.GetById(source.UserAccountId) ?? null;

            return account != null
                ? mapper.Map<UserAccount, UserAccountDto>(account)
                : null;
        }
    }
}
