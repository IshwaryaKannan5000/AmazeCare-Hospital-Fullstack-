using AmazeCare.Misc;
using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models.DTOs
{
    public class PatientUserDto
    {
        [Required]
        [NameValidation(ErrorMessage = "Full name can only contain letters and spaces.")]
        public string FullName { get; set; } = string.Empty;


        [Required]
        [EmailValidation]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        
        [Required]
        [ContactValidation(ErrorMessage = "Contact number must be exactly 10 digits.")]
        public string ContactNo { get; set; } = string.Empty;

        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

      

       
    }
}
