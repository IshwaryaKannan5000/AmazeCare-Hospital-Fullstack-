using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class MedicalTest
    {
        [Key]
        public int MedicalTestId { get; set; }

        [Required]
        public string TestName { get; set; } = string.Empty;

        public string? Description { get; set; }

        public ICollection<RecommendedTest>? RecommendedTests { get; set; } // ✅ Add this

    }
}



