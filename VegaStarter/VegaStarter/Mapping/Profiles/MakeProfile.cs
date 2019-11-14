using AutoMapper;
using VegaStarter.Controllers.Resources;
using VegaStarter.Models;

namespace VegaStarter.Mapping.Profiles
{
    public class MakeProfile : Profile
    {
        public MakeProfile()
        {
            CreateMap<Make, MakeResource>().ReverseMap();
            CreateMap<Make, KeyValuePairResource>().ReverseMap();
        }

    }
}
