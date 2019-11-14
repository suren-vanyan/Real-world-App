using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VegaStarter.Models
{

    [Table("Makes")]
    public class Make
    {

        public int Id { get; set; }
        [Required]
        [StringLength(200, ErrorMessage = "Name can't be longer than 200 characters")]
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }

        public Make()
        {
            Models = new Collection<Model>();
        }

    }
}