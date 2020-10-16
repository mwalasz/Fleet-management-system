using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.DTO;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Trips.Models;

namespace FleetManagement.AutoMapper.ValueResolvers
{
    public class TripDtoDriverAccountValueResolver : IValueResolver<Trip, TripDto, DriverAccountDto>
    {
        private readonly IMapper mapper;
        private readonly IDriverAccountProvider driverAccountProvider;

        public TripDtoDriverAccountValueResolver(IMapper mapper, IDriverAccountProvider driverAccountProvider)
        {
            this.mapper = mapper;
            this.driverAccountProvider = driverAccountProvider;
        }

        public DriverAccountDto Resolve(Trip source, TripDto destination, DriverAccountDto destMember, ResolutionContext context)
        {
            var account = driverAccountProvider.GetById(source.DriverAccountId) ?? null;

            return account != null
                ? mapper.Map<DriverAccount, DriverAccountDto>(account)
                : null;
        }
    }
}
