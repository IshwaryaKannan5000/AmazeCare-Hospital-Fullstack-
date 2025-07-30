using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace AmazeCare.Misc
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class EmailValidation : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            string? email = value as string;
            if (string.IsNullOrWhiteSpace(email))
            {
                return false;
            }

            // Basic regex for email validation
            string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            return Regex.IsMatch(email, pattern);
        }

        public override string FormatErrorMessage(string name)
        {
            return $"{name} must be a valid email address.";
        }
    }
}
