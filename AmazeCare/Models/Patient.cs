using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class Patient
    {
        [Key]
        public int PatientId { get; set; } // Primary Key

        [ForeignKey("User")]
        public int UserId { get; set; } // Foreign Key from User table

        public string MedicalHistory { get; set; } = string.Empty;

        // Navigation Property
        public User? User { get; set; }

        public ICollection<Appointment>? Appointments { get; set; }

        public ICollection<EmergencyContact> EmergencyContacts { get; set; } = new List<EmergencyContact>();

    }

}

