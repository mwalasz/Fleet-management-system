using AutoMapper;
using FleetManagement.Entities.Accounts.ManagerAccounts;
using FleetManagement.Entities.Accounts.ManagerAccounts.DTO;
using FleetManagement.Entities.Accounts.ManagerAccounts.Models;
using FleetManagement.Entities.Companies.Models;

namespace FleetManagement.AutoMapper.ValueResolvers
{
    public class CompanyDtoManagerAccountValueResolver : IValueResolver<Company, CompanyDto, ManagerAccountDto>
    {
        private readonly IMapper mapper;
        private readonly IManagerAccountProvider managerAccountProvider;

        public CompanyDtoManagerAccountValueResolver(IMapper mapper, IManagerAccountProvider managerAccountProvider)
        {
            this.mapper = mapper;
            this.managerAccountProvider = managerAccountProvider;
        }
        public ManagerAccountDto Resolve(Company source, CompanyDto destination, ManagerAccountDto destMember, ResolutionContext context)
        {
            var manager = managerAccountProvider.GetById(source.ManagerAccountId) ?? null;

            return mapper.Map<ManagerAccount, ManagerAccountDto>(manager);
        }
    }
}
