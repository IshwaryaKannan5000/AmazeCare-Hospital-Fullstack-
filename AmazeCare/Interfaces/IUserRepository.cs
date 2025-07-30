using AmazeCare.Models;

namespace AmazeCare.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAndPassword(string email, string password);
        Task<User?> GetUserByEmail(string email);
        Task<User?> GetUserById(int userId);
        Task<Role?> GetRoleByName(string roleName);
        Task<User> AddUser(User user);
        Task<bool> UpdateUser(User user);

        Task<bool> DeleteUser(int userId);

        Task<User> GetById(int userId);
    }
}
