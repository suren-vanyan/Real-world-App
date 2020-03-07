using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using VegaStarter.Core.Models;

namespace VegaStarter.Models
{
    [Table("Vehicles")]
    public class Vehicle
    {
        [Key]
        public int Id { get; set; }
       
        public int ModelId { get; set; }
        public Model Model { get; set; }

        public bool IsRegistered { get; set; }
        [Required]
        [StringLength(255, ErrorMessage = "ContactName can't be longer than 255 characters")]
        public string ContactName { get; set; }
      
        [StringLength(255, ErrorMessage = "ContactEmail can't be longer than 255 characters")]
        public string ContactEmail { get; set; }
        [Required]
        [StringLength(255, ErrorMessage = "ContactPhone can't be longer than 255 characters")]
        public string ContactPhone { get; set; }
        public DateTime LastUpdate { get; set; }

        public ICollection<Photo> Photos { get; set; }
        public ICollection<VehicleFeature> VehicleFeatures { get;}

        public Vehicle()
        {
            VehicleFeatures = new Collection<VehicleFeature>();
            Photos = new Collection<Photo>();
        }
    }
}
