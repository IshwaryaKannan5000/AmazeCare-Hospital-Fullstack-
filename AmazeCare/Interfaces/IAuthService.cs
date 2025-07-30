using AmazeCare.Models.DTOs;

namespace AmazeCare.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> AuthenticateAsync(LoginDto loginDto);
    }
}
