namespace AmazeCare.Models.DTOs
{
    public class TimeSlotViewDto
    {
        public int TimeSlotId { get; set; }
        public int DoctorId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAvailable { get; set; }

        public int BookingCount { get; set; } // Add this new property


    }
}
