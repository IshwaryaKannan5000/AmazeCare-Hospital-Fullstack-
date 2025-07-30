using System.ComponentModel.DataAnnotations;

namespace AmazeCare.Misc
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
    public class NameValidation : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            string strValue = value as string ?? "";
            strValue = strValue.Trim(); // Remove leading/trailing spaces

            if (string.IsNullOrWhiteSpace(strValue))
            {
                return false; // Reject empty or all-whitespace names
            }

            // Optional: Ensure only a single space between words
            if (System.Text.RegularExpressions.Regex.IsMatch(strValue, @"\s{2,}"))
            {
                return false; // Reject if two or more spaces appear consecutively
            }

            foreach (char c in strValue)
            {
                if (!char.IsLetter(c) && !char.IsWhiteSpace(c))
                {
                    return false;
                }
            }

            return true;
        }

    }
}
