using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class RecommendedTest
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("MedicalRecord")]
        public int MedicalRecordId { get; set; } // ✅ Add this

        [ForeignKey("MedicalTest")]
        public int MedicalTestId { get; set; }

        // Navigation properties
        public MedicalRecord? MedicalRecord { get; set; } // ✅ Add this
        public MedicalTest? MedicalTest { get; set; }
    }
}
