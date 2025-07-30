using System;

namespace AmazeCare.Exceptions
{
    public class PatientNotFoundException : Exception
    {
        public PatientNotFoundException()
            : base("No patients found with the given criteria.")
        {
        }
    }
}
