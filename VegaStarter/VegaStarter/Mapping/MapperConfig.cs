using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Models;
using VegaStarter.Models.Resources;

namespace VegaStarter.Mapping
{
    public static class MapperConfig
    {
        public static IMapper CreateMapper()
        {
            var mapperConfig = new MapperConfiguration(conf =>
              {
                  conf.CreateMap<Make, MakeResource>();
                  conf.CreateMap<Make, MakeResource>().ReverseMap();
                  conf.CreateMap<Model, ModelResource>();
                  conf.CreateMap<Model, ModelResource>().ReverseMap();
                  conf.CreateMap<Feature, FeatureResource>().ReverseMap();
                  conf.CreateMap<Vehicle, VehicleResource>()
                  .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Email = v.ContactEmail, Name = v.ContactName, Phone = v.ContactPhone }))
                  .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.VehicleFeatures.Select(vf => vf.FeatureId)));

                  //From Api Resource To Domain
                  conf.CreateMap<VehicleResource, Vehicle>()
                  .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                  .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                  .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                  .ForMember(v => v.VehicleFeatures, opt => opt.MapFrom(vr => vr.Features.Select(id => new VehicleFeature { FeatureId = id })));
                  
              });

            return mapperConfig.CreateMapper();
        }
    }
}
