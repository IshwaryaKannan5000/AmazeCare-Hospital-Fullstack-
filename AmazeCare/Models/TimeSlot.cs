using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models
{
    public class TimeSlot
    {
        [Key]
        public int TimeSlotId { get; set; }
        public int DoctorId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAvailable { get; set; } = true;

        public Doctor Doctor { get; set; }
    }
}