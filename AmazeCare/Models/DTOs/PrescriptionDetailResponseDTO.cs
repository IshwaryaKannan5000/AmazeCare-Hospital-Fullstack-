namespace AmazeCare.Models.DTOs
{
    public class PrescriptionDetailResponseDTO
    {
        public int DetailId { get; set; }
        public string? MedicineName { get; set; }
        public string? RecommendedTests { get; set; }
        public int DosageMorning { get; set; }
        public int DosageAfternoon { get; set; }
        public int DosageEvening { get; set; }
        public string? FoodTiming { get; set; }
    }
}
