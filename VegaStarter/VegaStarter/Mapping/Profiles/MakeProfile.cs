using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Models;

namespace VegaStarter.Mapping.Profiles
{
    public class MakeProfile:Profile
    {
        public MakeProfile()
        {
           var mapper= CreateMap<Make, MakeResource>().ReverseMap();
           
            
        }
       
    }
}
