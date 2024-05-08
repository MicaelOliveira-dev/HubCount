using HubFilmes.Application.DTOs;
using HubFilmes.Application.Interfaces;
using HubFilmes.Infra.Data.Interfaces;

namespace HubFilmes.Application.Services
{
    public class AuthUserService : IAuthUser
    {
        private readonly IAuthUserRepository _authUserRepository;

        public AuthUserService(IAuthUserRepository authUserRepository)
        {
            _authUserRepository = authUserRepository;
        }
        public async Task<UserDTO?> GetUserByEmailAndPassword(string email, string password)
        {
            var user = await _authUserRepository.GetUserByEmailAndPassword(email, password);
            return user != null ? new UserDTO { Id = user.Id, Name = user.Name, Email = user.Email, LinkFoto = user.LinkFoto } : null;
        }
    }
}
