namespace AmazeCare.Models.DTOs
{
    public class FilteredPatientDto
    {
        public int PatientId { get; set; }
        public int UserId { get; set; }
        public string MedicalHistory { get; set; } = string.Empty;
        public FilteredUserDto User { get; set; } = new();
    }

    public class FilteredUserDto
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ContactNo { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public int RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty;
    }
}
