namespace AmazeCare.Models.DTOs
{
    public class MedicalRecordViewDto
    {
        public int RecordId { get; set; }

        public int AppointmentId { get; set; }
        public string? PatientName { get; set; }
        public string? DoctorName { get; set; }

        public string? Symptoms { get; set; }
        public string Diagnosis { get; set; }
        public string TreatmentPlan { get; set; }
        public string? PrescribedMedications { get; set; }

        public List<string>? RecommendedTestNames { get; set; }
    }
}
