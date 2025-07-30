namespace AmazeCare.Models.DTOs
{
    public class PatientFilterDto
    {
        public string? FullName { get; set; }
        public string? ContactNo { get; set; }
        public string? Gender { get; set; }
        public DateRangeDto? DateOfBirthRange { get; set; }
    }

    public class DateRangeDto
    {
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}
