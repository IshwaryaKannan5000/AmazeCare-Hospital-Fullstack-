using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class Specialty
    {
        [Key]
        public int SpecialtyId { get; set; }

        [Required]
        public string SpecialtyName { get; set; } = string.Empty;

        // Navigation Property
        public ICollection<Doctor>? Doctors { get; set; }
    }
}

