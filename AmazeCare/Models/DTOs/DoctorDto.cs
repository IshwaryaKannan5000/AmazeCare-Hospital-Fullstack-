using AmazeCare.Misc;
using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Models.DTOs
{
    public class DoctorDto
    {


        [Required]
        [NameValidation(ErrorMessage = "Full name can only contain letters and spaces.")]
        public string FullName { get; set; }


        [Required]
        [EmailValidation]
        public string Email { get; set; }
        public string Password { get; set; }

        [Required]
        [ContactValidation(ErrorMessage = "Contact number must be exactly 10 digits.")]
        public string ContactNo { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

        public int SpecialtyId { get; set; }
        public int? Experience { get; set; }
        public string? Qualification { get; set; }
        public string Designation { get; set; }
    }
}

