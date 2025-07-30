namespace AmazeCare.Models.DTOs
{
    public class AppointmentFilterDto
    {
        public string? Status { get; set; }
        public DateRangeDto? DateRange { get; set; }
    }
}
