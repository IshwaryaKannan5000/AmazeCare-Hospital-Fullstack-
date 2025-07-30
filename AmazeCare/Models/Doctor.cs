using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmazeCare.Models
{
    public class Doctor
    {
        [Key]
        public int DoctorId { get; set; } // Primary Key

        [ForeignKey("User")]
        public int UserId { get; set; } // Foreign Key to Users

        [ForeignKey("Specialty")]
        public int SpecialtyId { get; set; } // Foreign Key to Specialties

        public int? Experience { get; set; }

        public string? Qualification { get; set; }

        [Required]
        public string Designation { get; set; } = string.Empty;

        // Navigation Properties
        public User? User { get; set; }
        public Specialty? Specialty { get; set; }

        public ICollection<Appointment>? Appointments { get; set; }
        public ICollection<TimeSlot>? TimeSlots { get; set; }

    }
}
