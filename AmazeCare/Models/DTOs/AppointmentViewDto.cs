namespace AmazeCare.Models.DTOs
{
    public class AppointmentViewDto
    {
        public int AppointmentId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Status { get; set; }
        public string? Symptoms { get; set; }

        public int PatientId { get; set; }
        public string? PatientName { get; set; }
        public string? ContactNo { get; set; }
    }
}
