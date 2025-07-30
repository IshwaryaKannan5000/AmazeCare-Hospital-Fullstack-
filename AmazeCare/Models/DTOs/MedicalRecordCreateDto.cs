namespace AmazeCare.Models.DTOs
{
    public class MedicalRecordCreateDto
    {
        public int AppointmentId { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }

        public string? Symptoms { get; set; }
        public string Diagnosis { get; set; } = string.Empty;
        public string TreatmentPlan { get; set; } = string.Empty;
        public string? PrescribedMedications { get; set; }

        public List<int>? RecommendedTestIds { get; set; }
    }
}
