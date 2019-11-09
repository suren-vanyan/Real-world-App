using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VegaStarter.Models
{
    [Table("Models")]
    public class Model
    {
        public int Id { get; set; }
        [Required]
        [StringLength(200, ErrorMessage = "Name can't be longer than 200 characters")]
        public string  Name { get; set; }   

        public Make  Make { get; set; }  
        public int MakeId { get; set; }
    }
}