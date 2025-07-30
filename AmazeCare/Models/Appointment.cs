using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmazeCare.Models
{
    public class Appointment
    {
        [Key]
        public int AppointmentId { get; set; }

        [ForeignKey("Patient")]
        public int PatientId { get; set; }

        [ForeignKey("Doctor")]
        public int DoctorId { get; set; }

        public DateTime AppointmentDate { get; set; }

        public string? Symptoms { get; set; }

        [Required]
        public string Status { get; set; } = string.Empty;

        // Navigation Properties
        public Patient? Patient { get; set; }
        public Doctor? Doctor { get; set; }
    }
}
