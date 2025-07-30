using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class Prescription
    {
        [Key]
        public int PrescriptionId { get; set; }

        [ForeignKey("Appointment")]
        public int AppointmentId { get; set; }

        [ForeignKey("Doctor")]
        public int DoctorId { get; set; }

        [ForeignKey("Patient")]
        public int PatientId { get; set; }

        // Navigation Properties
        public Appointment? Appointment { get; set; }
        public Doctor? Doctor { get; set; }
        public Patient? Patient { get; set; }

        public ICollection<PrescriptionDetail>? PrescriptionDetails { get; set; }
    }
}
