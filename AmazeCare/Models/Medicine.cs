using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class Medicine
    {
        [Key]
        public int MedicineId { get; set; } // Primary Key

        [Required]
        [MaxLength(255)]
        public string MedicineName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string DosageForm { get; set; } = string.Empty; // (Tablet, Syrup, etc.)

        [MaxLength(50)]
        public string? Strength { get; set; } // (e.g., 500mg)

        [MaxLength(255)]
        public string? Manufacturer { get; set; }

        public string? Description { get; set; }

        // Navigation property (optional)
        public ICollection<PrescriptionDetail>? PrescriptionDetails { get; set; }
    }
}
