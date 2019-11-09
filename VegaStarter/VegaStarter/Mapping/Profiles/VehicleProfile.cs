using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Models;
using VegaStarter.Models.Resources;

namespace VegaStarter.Mapping.Profiles
{
    public class VehicleProfile : Profile
    {
        public VehicleProfile()
        {
            CreateMap<Vehicle, VehicleResource>()
                 .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Email = v.ContactEmail, Name = v.ContactName, Phone = v.ContactPhone }))
                 .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.VehicleFeatures.Select(vf => vf.FeatureId)));

            //From Api Resource To Domain
            CreateMap<VehicleResource, Vehicle>()
            .ForMember(v => v.Id, vr => vr.Ignore())
            .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
            .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
            .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
            .ForMember(v => v.VehicleFeatures, opt => opt.Ignore())
            .AfterMap((vehicleResource, vehicle) =>
            {
                //Removing unselected Features                                     
                var removingFeatures = vehicle.VehicleFeatures.Where(v => !vehicleResource.Features.Contains(v.FeatureId));

                if (removingFeatures.Any())

                    if (removingFeatures.Any())
                        foreach (var removingFeature in removingFeatures)
                            vehicle.VehicleFeatures.Remove(removingFeature);


                //Adding new Features
                var addingFeatures = vehicleResource.Features.Where(vr => !vehicle.VehicleFeatures.Any(v => v.FeatureId == vr))
                .Select(id => new VehicleFeature { FeatureId = id });
                foreach (var addingFeature in addingFeatures)
                    vehicle.VehicleFeatures.Add(addingFeature);


            });
        }
    }
}
