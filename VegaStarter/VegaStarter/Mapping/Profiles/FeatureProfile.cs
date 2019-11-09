using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Models;
using VegaStarter.Models.Resources;

namespace VegaStarter.Mapping.Profiles
{
    public class FeatureProfile:Profile
    {
        public FeatureProfile()
        {
            CreateMap<Feature, FeatureResource>().ReverseMap();
        }
    }
}
