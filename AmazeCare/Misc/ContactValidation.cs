using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace AmazeCare.Misc
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class ContactValidation : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            string? contact = value as string;

            if (string.IsNullOrWhiteSpace(contact))
                return false;

            // Check if it's exactly 10 digits
            return Regex.IsMatch(contact, @"^\d{10}$");
        }

        public override string FormatErrorMessage(string name)
        {
            return $"{name} must be exactly 10 digits and contain only numbers.";
        }
    }
}
