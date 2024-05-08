using HubFilmes.Application.Interfaces;
using HubFilmes.Domain.Entities;
using HubFilmes.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace HubFilmes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("GetAllMovies")]
        public async Task<ActionResult<List<Movie>>> GetAllMovies()
        {
            try
            {
                var movies = await _movieService.GetAllMoviesAsync();
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao obter todos os filmes: {ex.Message}");
            }
        }

        [HttpGet("GetMovieById/{Id}")]
        public async Task<ActionResult<Movie>> GetMovieById(int Id)
        {
            try
            {
                var movie = await _movieService.GetMovieByIdAsync(Id);
                if (movie == null)
                    return NotFound($"Filme com o ID {Id} não encontrado.");

                return Ok(movie);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao obter o filme com o ID {Id}: {ex.Message}");
            }
        }

        [HttpGet("GetMoviesByYear/{year}")]
        public async Task<ActionResult<List<Movie>>> GetMoviesByYear(int year)
        {
            try
            {
                var movies = await _movieService.GetMoviesByYearAsync(year);
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao obter os filmes de {year}: {ex.Message}");
            }
        }

        [HttpGet("GetMoviesByGenre/{genre}")]
        public async Task<ActionResult<List<Movie>>> GetMoviesByGenre(EGenre genre)
        {
            try
            {
                var movies = await _movieService.GetMoviesByGenreAsync(genre);
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao obter os filmes do gênero {genre}: {ex.Message}");
            }
        }

        [HttpGet("GetMoviesByName/{name}")]
        public async Task<ActionResult<List<Movie>>> GetMoviesByName(string name)
        {
            try
            {
                var movies = await _movieService.GetMoviesByNameAsync(name);
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao obter os filmes com o nome {name}: {ex.Message}");
            }
        }

        [HttpGet("GetTheMoviesAccordingToYourSearch/{title}")]
        public async Task<ActionResult> SearchMovies(string title)
        {
            try
            {
                var movies = await _movieService.SearchMoviesByTitle(title);
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar filmes: {ex.Message}");
            }
        }

        [HttpPost("CreateMovie")]
        public async Task<ActionResult<Movie>> AddMovie(Movie movie)
        {
            try
            {
                var addedMovie = await _movieService.AddMovieAsync(movie);
                return CreatedAtAction(nameof(GetMovieById), new { id = addedMovie.Id }, addedMovie);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao cadastrar o filme: {ex.Message}");
            }
        }

        [HttpDelete("DeleteMovie/{id}")]
        public async Task<ActionResult> DeleteMovie(int id)
        {
            try
            {
                var success = await _movieService.DeleteMovieAsync(id);
                if (!success)
                    return NotFound($"Filme com o ID {id} não encontrado.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao excluir o filme com o ID {id}: {ex.Message}");
            }
        }
    }
}
