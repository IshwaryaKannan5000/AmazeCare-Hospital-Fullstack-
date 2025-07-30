using AmazeCare.Contexts;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AmazeCare.Misc
{
    public class IDGeneratorService
    {
        private readonly AmazecareContext _context;

        public IDGeneratorService(AmazecareContext context)
        {
            _context = context;
        }

        public async Task<string> GenerateIDAsync(char prefix)
        {
            var outputParam = new SqlParameter
            {
                ParameterName = "@GeneratedID",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 10,
                Direction = System.Data.ParameterDirection.Output
            };

            var prefixParam = new SqlParameter("@Prefix", prefix);

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC proc_GenerateCustomID @Prefix, @GeneratedID OUTPUT",
                prefixParam, outputParam);

            return outputParam.Value?.ToString() ?? string.Empty;
        }
    }
}
