using AutoMapper;
using VegaStarter.Controllers.Resources;
using VegaStarter.Models;

namespace VegaStarter.Mapping.Profiles
{
    public class FeatureProfile:Profile
    {
        public FeatureProfile()
        {
            CreateMap<Feature, KeyValuePairResource>().ReverseMap();
        }
    }
}
