using AutoMapper;
using FleetManagement.Entities.Accounts.DriverAccounts.Models;
using FleetManagement.Entities.Companies.Models;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.AutoMapper.ValueResolvers.Companies
{
    public class CompanyDtoDriversValueResolver : IValueResolver<Company, CompanyDto, List<DriverAccountBasicInfoDto>>
    {
        private readonly IMapper mapper;

        public CompanyDtoDriversValueResolver(IMapper mapper)
        {
            this.mapper = mapper;
        }

        public List<DriverAccountBasicInfoDto> Resolve(Company source, CompanyDto destination, List<DriverAccountBasicInfoDto> destMember, ResolutionContext context)
        {
            return source.Drivers.Select(x => mapper.Map<DriverAccount, DriverAccountBasicInfoDto>(x)).ToList() ?? new List<DriverAccountBasicInfoDto>();
        }
    }
}
