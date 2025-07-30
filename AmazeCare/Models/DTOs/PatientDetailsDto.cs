namespace AmazeCare.Models.DTOs
{
    public class PatientDetailsDto
    {
        public int PatientId { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? ContactNo { get; set; }
        public string? MedicalHistory { get; set; }
    }
}
