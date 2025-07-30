using AmazeCare.Contexts;
using AmazeCare.Interfaces;
using AmazeCare.Models;
using System.Threading.Tasks;

namespace AmazeCare.Repositories
{
    public class LoginAuthRepository : ILoginAuthRepository
    {
        private readonly AmazecareContext _context;

        public LoginAuthRepository(AmazecareContext context)
        {
            _context = context;
        }

        public async Task AddLoginAsync(LoginAuth loginAuth)
        {
            await _context.LoginAuths.AddAsync(loginAuth);
            await _context.SaveChangesAsync();
        }
    }
}
