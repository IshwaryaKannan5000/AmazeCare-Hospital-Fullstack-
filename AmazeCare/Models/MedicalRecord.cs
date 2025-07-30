using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class MedicalRecord
    {
        [Key]
        public int RecordId { get; set; }

        [ForeignKey("Appointment")]
        public int AppointmentId { get; set; }

        [ForeignKey("Doctor")]
        public int DoctorId { get; set; }

        [ForeignKey("Patient")]
        public int PatientId { get; set; }

        public string? Symptoms { get; set; }

        [Required]
        public string Diagnosis { get; set; } = string.Empty;

        [Required]
        public string TreatmentPlan { get; set; } = string.Empty;

        public string? PrescribedMedications { get; set; }
        public ICollection<RecommendedTest>? RecommendedTests { get; set; } // ✅ Add this


        // Navigation Properties
        public Appointment? Appointment { get; set; }
        public Doctor? Doctor { get; set; }
        public Patient? Patient { get; set; }
    }
}
