namespace AmazeCare.Models.DTOs
{
    public class AdminPatientResponseDto
    {
        public int PatientId { get; set; }
        public int UserId { get; set; }
        public string MedicalHistory { get; set; } = string.Empty;
    }
}
