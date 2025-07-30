using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmazeCare.Models
{
    public class LoginAuth
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LoginId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Role { get; set; } = string.Empty;

        [Required]
        public DateTime LoginTime { get; set; }
    }
}
