using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Trips.Models;

namespace FleetManagement.AutoMapper.ValueResolvers.TripDtos
{
    public class TripDtoDriverAccountValueResolver : IValueResolver<Trip, TripDto, DriverTripInfoDto>
    {
        private readonly IMapper mapper;
        private readonly IDriverAccountProvider driverAccountProvider;

        public TripDtoDriverAccountValueResolver(IMapper mapper, IDriverAccountProvider driverAccountProvider)
        {
            this.mapper = mapper;
            this.driverAccountProvider = driverAccountProvider;
        }

        public DriverTripInfoDto Resolve(Trip source, TripDto destination, DriverTripInfoDto destMember, ResolutionContext context)
        {
            var account = driverAccountProvider.GetById(source.DriverAccountId) ?? null;

            return account != null
                ? mapper.Map<DriverAccount, DriverTripInfoDto>(account)
                : null;
        }
    }
}
