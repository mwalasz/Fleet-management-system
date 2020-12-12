using AutoMapper;
using FleetManagement.Entities.BrandModels.Models;
using FleetManagement.Entities.Brands.Models;
using System.Collections.Generic;
using System.Linq;

namespace FleetManagement.AutoMapper.ValueResolvers
{
    public class BrandDtoModelValueResolver : IValueResolver<Brand, BrandDto, IEnumerable<BrandModelDto>>
    {
        private readonly IMapper mapper;

        public BrandDtoModelValueResolver(IMapper mapper)
        {
            this.mapper = mapper;
        }

        public IEnumerable<BrandModelDto> Resolve(Brand source, BrandDto destination, IEnumerable<BrandModelDto> destMember, ResolutionContext context)
        {
            return source.Models?.Select(x => mapper.Map<BrandModel, BrandModelDto>(x)) ?? new List<BrandModelDto>();
        }
    }
}
