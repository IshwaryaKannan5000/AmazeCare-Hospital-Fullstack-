namespace AmazeCare.Models.DTOs
{
    public class UpdateMedicalRecordDto
    {
        public int RecordId { get; set; }

        public string? Symptoms { get; set; }
        public string Diagnosis { get; set; } = string.Empty;
        public string TreatmentPlan { get; set; } = string.Empty;
        public string? PrescribedMedications { get; set; }

        public List<int>? RecommendedTestIds { get; set; }
    }
}
