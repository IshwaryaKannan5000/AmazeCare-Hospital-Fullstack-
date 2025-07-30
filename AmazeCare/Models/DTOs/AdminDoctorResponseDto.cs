namespace AmazeCare.Models.DTOs
{
    public class AdminDoctorResponseDto
    {
        public int DoctorId { get; set; }
        public int UserId { get; set; }
        public string Designation { get; set; } = string.Empty;
    }
}
