using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Models.Resources;

namespace VegaStarter.Models
{
    public class MakeResource:KeyValuePairResource
    {

        public ICollection<KeyValuePairResource> Models { get; set; }
        public IEnumerable<KeyValuePairResource> MyProperty { get; set; }
        public MakeResource()
        {
            Models = new Collection<KeyValuePairResource>();
            MyProperty= new Collection<KeyValuePairResource>();
        }
    }
}
