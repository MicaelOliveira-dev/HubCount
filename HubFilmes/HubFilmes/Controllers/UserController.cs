using HubFilmes.Application.DTOs;
using HubFilmes.Application.Services;
using HubFilmes.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HubFilmes.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<List<UserDTO>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            if (users == null)
            {
                return NotFound();
            }
            return Ok(users);
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<ActionResult<UserDTO>> GetUserByIdAsync(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("AddMovieToFavorites/{userId}/{movieId}")]
        public async Task<ActionResult> AddMovieToFavoritesAsync(int userId, int movieId)
        {
            try
            {
                await _userService.AddMovieToFavoritesAsync(userId, movieId);
                return Ok("Filme adicionado aos favoritos com sucesso");
            }
            catch (DllNotFoundException)
            {
                return NotFound("Usuário não encontrado");
            }
        }

        [HttpDelete("RemoveFavoriteMovie/{userId}/{movieId}")]
        public async Task<ActionResult> RemoveFavoriteMovieAsync(int userId, int movieId)
        {
            try
            {
                var userDTO = await _userService.GetUserByIdAsync(userId);
                if (userDTO == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                if (userDTO.FilmesFavoritosList == null || !userDTO.FilmesFavoritosList.Contains(movieId))
                {
                    return NotFound("Filme não encontrado na lista de favoritos do usuário");
                }

                userDTO.FilmesFavoritosList.Remove(movieId);

                userDTO.FilmesFavoritos = userDTO.FilmesFavoritosList.Count;
                var user = MapDTOToUser(userDTO);

                await _userService.UpdateUserAsync(userId, user);

                return Ok("Filme removido da lista de favoritos com sucesso");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocorreu um erro ao remover o filme da lista de favoritos: {ex.Message}");
            }
        }

        [HttpGet("CheckIfMovieIsFavorited/{userId}/{movieId}")]
        public async Task<ActionResult<bool>> CheckIfMovieIsFavoritedAsync(int userId, int movieId)
        {
            try
            {
                var userDTO = await _userService.GetUserByIdAsync(userId);
                if (userDTO == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                var isFavorited = userDTO.FilmesFavoritosList != null && userDTO.FilmesFavoritosList.Contains(movieId);

                return Ok(isFavorited);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocorreu um erro ao verificar se o filme está favoritado: {ex.Message}");
            }
        }

        [HttpGet("GetUserFavoriteMovies/{userId}")]
        public async Task<ActionResult<List<int>>> GetUserFavoriteMoviesAsync(int userId)
        {
            try
            {
                var userDTO = await _userService.GetUserByIdAsync(userId);
                if (userDTO == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                var favoriteMovies = userDTO.FilmesFavoritosList ?? new List<int>();

                return Ok(favoriteMovies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocorreu um erro ao obter os filmes favoritos do usuário: {ex.Message}");
            }
        }

        [HttpPost("RegisterUser")]
        public async Task<ActionResult<User>> RegisterUserAsync(UserDTO userDTO)
        {
            var user = await _userService.RegisterUserAsync(userDTO);
            return Ok(user);
        }

        [HttpPut("UpdateUser/{id}")]
        public async Task<ActionResult> UpdateUserAsync(int id, User user)
        {
            try
            {
                await _userService.UpdateUserAsync(id, user);
                return Ok("Usuário alterado com sucesso");
            }
            catch (DllNotFoundException)
            {
                return NotFound("Usuário não encontrado");
            }
        }

        [HttpDelete("SoftDeleteUser/{id}")]
        public async Task<ActionResult> SoftDeleteUserAsync(int id)
        {
            try
            {
                await _userService.DeleteUserAsync(id);
                return Ok("Usuário deletado com sucesso");
            }
            catch (DllNotFoundException)
            {
                return NotFound("Usuário não encontrado");
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
    }
}
