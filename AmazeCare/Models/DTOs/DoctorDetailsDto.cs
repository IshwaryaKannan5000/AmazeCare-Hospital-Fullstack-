namespace AmazeCare.Models.DTOs
{
    public class DoctorDetailsDto
    {
        public int DoctorId { get; set; }
        public int UserId { get; set; } // <-- Add this line
        public string FullName { get; set; } = string.Empty;
        public string Contact { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Designation { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
        public int? Experience { get; set; }
        public string? Qualification { get; set; }
        public bool IsAvailable { get; set; }
        public string RoleName { get; set; }
    }
}