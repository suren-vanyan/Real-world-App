using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace VegaStarter.Models.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }

        public KeyValuePairResource Model { get; set; }

        public KeyValuePairResource Make { get; set; }
        public bool IsRegitered { get; set; }
       
        public ContactResource Contact { get; set; }
    
        public DateTime LastUpdate { get; set; }
        public ICollection<KeyValuePairResource> FeatureResources { get; }

        public VehicleResource()
        {
            FeatureResources = new Collection<KeyValuePairResource>();
        }
    }
}
