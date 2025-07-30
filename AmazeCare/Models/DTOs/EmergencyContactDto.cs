namespace AmazeCare.Models.DTOs
{
    public class EmergencyContactDto
    {
        public int PatientId { get; set; }
        public string ContactName { get; set; } = string.Empty;
        public string Relationship { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
    }
}
