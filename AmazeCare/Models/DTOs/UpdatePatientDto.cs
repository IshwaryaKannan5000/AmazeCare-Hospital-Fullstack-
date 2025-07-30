namespace AmazeCare.Models.DTOs
{
    public class UpdatePatientDto
    {
        public int UserId { get; set; }

        public FullNameUpdateDto? FullNameUpdate { get; set; }
        public ContactNoUpdateDto? ContactNoUpdate { get; set; }
        public GenderUpdateDto? GenderUpdate { get; set; }
        public DateOfBirthUpdateDto? DateOfBirthUpdate { get; set; }
        public MedicalHistoryUpdateDto? MedicalHistoryUpdate { get; set; }

       
    }

    public class FullNameUpdateDto
    {
        public string NewFullName { get; set; } = string.Empty;
    }

    public class ContactNoUpdateDto
    {
        public string NewContactNo { get; set; } = string.Empty;
    }

    public class GenderUpdateDto
    {
        public string NewGender { get; set; } = string.Empty;
    }

    public class DateOfBirthUpdateDto
    {
        public DateTime NewDateOfBirth { get; set; }
    }

    public class MedicalHistoryUpdateDto
    {
        public string NewMedicalHistory { get; set; } = string.Empty;
    }

  
}
