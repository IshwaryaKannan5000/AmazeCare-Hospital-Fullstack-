namespace AmazeCare.Models.DTOs
{
    public class RecommendedTestDto
    {
        public int MedicalTestId { get; set; }
        public string? TestName { get; set; }  // 👈 Add this if missing
        public string? Notes { get; set; }
    }
}
