using AmazeCare.Misc;
using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models.DTOs
{
    public class PatientDto
    {
      
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ContactNo { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
      
    }

}
