using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmazeCare.Models
{
    public class EmergencyContact
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ContactId { get; set; }

        [ForeignKey("Patient")]
        public int PatientId { get; set; }

        [Required]
        [MaxLength(255)]
        public string ContactName { get; set; } = string.Empty;

        [Required]
        [MaxLength(15)]
        public string ContactPhone { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Relationship { get; set; } = string.Empty;

        public Patient? Patient { get; set; }
    }
}
