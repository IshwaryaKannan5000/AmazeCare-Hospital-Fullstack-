namespace AmazeCare.Models.DTOs
{
    public class PatientMedicalHistoryDto
    {
        public int AppointmentId { get; set; }
        public string? DoctorName { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string? Symptoms { get; set; }
        public string? Diagnosis { get; set; }
        public string? TreatmentPlan { get; set; }
        public string? PrescribedMedications { get; set; }
        public List<string>? RecommendedTests { get; set; }
        public List<PrescriptionDetailResponseDTO>? PrescriptionDetails { get; set; }
    }
}
