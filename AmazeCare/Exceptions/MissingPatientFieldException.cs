namespace AmazeCare.Exceptions
{
    public class MissingPatientFieldException : Exception
    {
        public MissingPatientFieldException(string fieldName)
            : base($"{fieldName} is null or invalid in the database.")
        {
        }
    }
}
