namespace AmazeCare.Models.DTOs
{
    public class AppointmentResponseDto
    {
        public int AppointmentId { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Symptoms { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public string DoctorName { get; set; } = string.Empty;

        public string PatientName { get; set; } = string.Empty;

    }
}

