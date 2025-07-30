namespace AmazeCare.Models.DTOs
{
    public class EmergencyContactResponseDto
    {
        public int ContactId { get; set; }

        public int PatientId { get; set; } 
        public string PatientName { get; set; } = string.Empty;
        public string ContactName { get; set; } = string.Empty;
        public string Relationship { get; set; } = string.Empty;
        public string ContactPhone { get; set; } = string.Empty;
    }
}
