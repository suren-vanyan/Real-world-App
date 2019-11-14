using AutoMapper;
using VegaStarter.Controllers.Resources;
using VegaStarter.Models;

namespace VegaStarter.Mapping.Profiles
{
    public class ModelProfile : Profile
    {
        public ModelProfile()
        {
            var mapper = CreateMap<Model, KeyValuePairResource>().ReverseMap();

        }
    }
}
