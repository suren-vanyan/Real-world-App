using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Models;
using VegaStarter.Models.Resources;

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
