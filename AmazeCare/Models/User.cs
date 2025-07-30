using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AmazeCare.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public int RoleId { get; set; }  // Foreign Key

        public string RoleName { get; set; } = string.Empty;

        [Required]
        [MaxLength(15)]
        public string ContactNo { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        [Required]
        [MaxLength(10)]
        public string Gender { get; set; } = string.Empty;

        // Navigation property for Role
        [ForeignKey("RoleId")]
        public Role? Role { get; set; }

      
    }
}
