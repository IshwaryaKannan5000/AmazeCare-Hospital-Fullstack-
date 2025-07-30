using System;

namespace AmazeCare.Exceptions
{
    public class RoleNotFoundException : Exception
    {
        public RoleNotFoundException(string roleName)
            : base($"Role '{roleName}' not found.")
        {
        }
    }
}
