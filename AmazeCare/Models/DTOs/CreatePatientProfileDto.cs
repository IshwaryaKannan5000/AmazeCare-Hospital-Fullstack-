public class CreatePatientProfileDto
{
    public int UserId { get; set; }  // Reference to the user's ID
    public string BloodGroup { get; set; }
    public string Allergy { get; set; }
    public string MedicalHistory { get; set; }
}
