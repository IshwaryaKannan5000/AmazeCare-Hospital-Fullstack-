namespace AmazeCare.Models.DTOs
{
    public class TimeSlotUpdateDto
    {
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public bool? IsAvailable { get; set; }
    }

}
