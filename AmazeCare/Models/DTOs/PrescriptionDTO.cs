namespace AmazeCare.Models.DTOs
{
    public class PrescriptionDTO
    {
        public int AppointmentId { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public List<PrescriptionDetailDTO> Details { get; set; } = new();
    }
}
