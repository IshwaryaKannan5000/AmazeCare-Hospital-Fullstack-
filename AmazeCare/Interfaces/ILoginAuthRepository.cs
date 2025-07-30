using AmazeCare.Models;
using System.Threading.Tasks;

namespace AmazeCare.Interfaces
{
    public interface ILoginAuthRepository
    {
        Task AddLoginAsync(LoginAuth loginAuth);
    }
}
