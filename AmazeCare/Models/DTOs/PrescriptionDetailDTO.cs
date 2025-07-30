namespace AmazeCare.Models.DTOs
{
    public class PrescriptionDetailDTO
    {
        public int MedicineId { get; set; }
        public string? RecommendedTests { get; set; }
        public int DosageMorning { get; set; }
        public int DosageAfternoon { get; set; }
        public int DosageEvening { get; set; }
        public int BeforeOrAfterFood { get; set; }
    }
}
