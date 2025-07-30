using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class PrescriptionDetail
    {
        [Key]
        public int DetailId { get; set; }

        [ForeignKey("Prescription")]
        public int PrescriptionId { get; set; }

        [ForeignKey("Medicine")]
        public int MedicineId { get; set; }

        public string? RecommendedTests { get; set; }  // <-- New Field
        public int DosageMorning { get; set; } = 0;
        public int DosageAfternoon { get; set; } = 0;
        public int DosageEvening { get; set; } = 0;

        [ForeignKey("FoodTiming")]
        public int BeforeOrAfterFood { get; set; }

        // Navigation Properties
        public Prescription? Prescription { get; set; }
        public Medicine? Medicine { get; set; }
        public FoodTiming? FoodTiming { get; set; }
    }
}
