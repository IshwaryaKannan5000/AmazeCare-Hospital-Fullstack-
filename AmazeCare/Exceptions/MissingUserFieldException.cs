namespace AmazeCare.Exceptions
{
    public class MissingUserFieldException : Exception
    {
        public MissingUserFieldException(string fieldName)
            : base($"{fieldName} is null or invalid in the database.")
        {
        }
    }
}
