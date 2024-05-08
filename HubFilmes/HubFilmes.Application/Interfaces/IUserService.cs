using HubFilmes.Application.DTOs;
using HubFilmes.Domain.Entities;

namespace HubFilmes.Application.Services
{
    public interface IUserService
    {
        Task<UserDTO> GetUserByIdAsync(int id);
        Task<List<UserDTO>> GetAllUsers();
        Task<User> RegisterUserAsync(UserDTO userDTO);
        Task UpdateUserAsync(int id, User user);
        Task DeleteUserAsync(int id);
        Task AddMovieToFavoritesAsync(int userId, int movieId);

    }
}
