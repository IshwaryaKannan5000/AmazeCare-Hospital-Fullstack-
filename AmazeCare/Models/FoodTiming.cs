using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class FoodTiming
    {
        [Key]
        public int TimingId { get; set; } // Primary Key

        [Required]
        [MaxLength(50)]
        public string TimingName { get; set; } = string.Empty;

        // Navigation property (optional)
        public ICollection<PrescriptionDetail>? PrescriptionDetails { get; set; }
    }
}
