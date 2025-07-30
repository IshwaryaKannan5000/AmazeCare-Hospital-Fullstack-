namespace AmazeCare.Models.DTOs
{
    public class UpdateDoctorDto
    {
        public int UserId { get; set; }
        public string NewFullName { get; set; }
        public string NewContactNo { get; set; }
        public string  NewGender { get; set; }
        public DateTime? NewDateOfBirth { get; set; }
        public int? NewExperience { get; set; }
        public string NewQualification { get; set; }
        public string NewDesignation { get; set; }
    }
}

