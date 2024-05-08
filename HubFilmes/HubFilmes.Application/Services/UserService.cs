using HubFilmes.Application.DTOs;
using HubFilmes.Application.Security;
using HubFilmes.Domain.Entities;
using HubFilmes.infra.Data.Repositories;

namespace HubFilmes.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDTO?> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            var userDTO = MapUserToDTO(user);
            return user != null ? userDTO : null;
        }

        public async Task<User> RegisterUserAsync(UserDTO userDTO)
        {
            var hashedPassword = PasswordHasher.HashPassword(userDTO.Password);
            var user = MapDTOToUser(userDTO);
            if (user.FilmesFavoritosList == null)
            {
                user.FilmesFavoritosList = new List<int>();
            }
            user.Password = hashedPassword;
            return await _userRepository.RegisterUserAsync(user);
        }

        public async Task UpdateUserAsync(int id, User userEntite)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                throw new DllNotFoundException("Usuário não encontrado");
            }

            if (userEntite.Name != "string")
            {
                user.Name = userEntite.Name;
            }
            if (userEntite.Email != "string")
            {
                user.Email = userEntite.Email;
            }
            if (userEntite.FilmesFavoritos != null)
            {
                user.FilmesFavoritos = userEntite.FilmesFavoritos;
            }
            if (userEntite.LinkFoto != "string")
            {
                user.LinkFoto = userEntite.LinkFoto;
            }

            await _userRepository.UpdateAsync(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                throw new DllNotFoundException("Usuário não encontrado");
            }

            await _userRepository.SoftDeleteAsync(user);
        }

        public async Task AddMovieToFavoritesAsync(int userId, int movieId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new DllNotFoundException("Usuário não encontrado");
            }

            if (user.FilmesFavoritosList == null)
            {
                user.FilmesFavoritosList = new List<int>();
            }

            if (!user.FilmesFavoritosList.Contains(movieId))
            {
                user.FilmesFavoritosList.Add(movieId);
                user.FilmesFavoritos = user.FilmesFavoritosList.Count;
                await _userRepository.UpdateAsync(user);
            }
        }

        private User MapDTOToUser(UserDTO userDTO)
        {
            return new User
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                FilmesFavoritos = userDTO.FilmesFavoritos,
                LinkFoto = userDTO.LinkFoto,
                Followers = userDTO.Followers,                
            };
        }

        private UserDTO MapUserToDTO(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                FilmesFavoritos = user.FilmesFavoritos,
                LinkFoto = user.LinkFoto,
                Followers = user.Followers,
                FilmesFavoritosList = user.FilmesFavoritosList
            };
        }
        private List<UserDTO> MapUsersToDTO(List<User> users)
        {
            var userDTOs = new List<UserDTO>();
            foreach (var user in users)
            {
                var userDTO = MapUserToDTO(user);
                userDTOs.Add(userDTO);
            }
            return userDTOs;
        }

        public async Task<List<UserDTO>> GetAllUsers()
        {
            var users = await _userRepository.GetAllAsync();
            return users != null ? MapUsersToDTO(users) : new List<UserDTO>();
        }
    }
}
