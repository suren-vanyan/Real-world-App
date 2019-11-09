using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VegaStarter.Models
{
    [Table("Features")]
    public class Feature
    {
        public int Id { get; set; }

        [StringLength(50, ErrorMessage = "Name can't be longer than 50 characters")]
        public string Name { get; set; }

        public ICollection<VehicleFeature> VehicleFeatures { get; set; }

        public Feature()
        {
            VehicleFeatures = new Collection<VehicleFeature>();
        }
    }
}