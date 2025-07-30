namespace AmazeCare.Models.DTOs
{
    public class PrescriptionResponseDTO
    {
        public int PrescriptionId { get; set; }
        public int AppointmentId { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public List<PrescriptionDetailResponseDTO> Details { get; set; } = new();
    }
}
