using AmazeCare.Interfaces;
using AmazeCare.Models.DTOs;
using AmazeCare.Models;
using System;
using System.Threading.Tasks;

namespace AmazeCare.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly TokenService _tokenService;
        private readonly ILoginAuthRepository _loginAuthRepository;

        public AuthService(IUserRepository userRepository, TokenService tokenService, ILoginAuthRepository loginAuthRepository)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _loginAuthRepository = loginAuthRepository;
        }

        public async Task<AuthResponseDto> AuthenticateAsync(LoginDto loginDto)
        {
            // Admin login
            if (loginDto.Email == "admin@gmail.com" && loginDto.Password == "Securepass123")
            {
                var fakeAdmin = new User
                {
                    UserId = 1,
                    FullName = "Admin",
                    Email = loginDto.Email
                };

                string token = _tokenService.GenerateToken(fakeAdmin, "admin");

                await _loginAuthRepository.AddLoginAsync(new LoginAuth
                {
                    UserId = 1,
                    Role = "admin",
                    LoginTime = DateTime.UtcNow
                });

                return new AuthResponseDto { Token = token, Role = "admin", UserId = 1 };
            }

            // Patient or Doctor login
            var user = await _userRepository.GetUserByEmail(loginDto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password) || user.RoleName == "inactive")
            {
                throw new UnauthorizedAccessException("User not found or inactive");
            }

            string jwtToken = _tokenService.GenerateToken(user, user.RoleName);

            await _loginAuthRepository.AddLoginAsync(new LoginAuth
            {
                UserId = user.UserId,
                Role = user.RoleName,
                LoginTime = DateTime.UtcNow
            });

            return new AuthResponseDto
            {
                Token = jwtToken,
                Role = user.RoleName,
                UserId = user.UserId
            };
        }

    }
}
