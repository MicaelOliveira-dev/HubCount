using HubFilmes.Application.DTOs;
using HubFilmes.Application.Interfaces;
using HubFilmes.Domain.Entities;
using HubFilmes.Domain.Enums;
using HubFilmes.infra.Data.Repositories;

namespace HubFilmes.Application.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;

        public MovieService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public async Task<List<Movie>> GetAllMoviesAsync()
        {
            try
            {
                return await _movieRepository.GetAllMoviesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao obter todos os filmes", ex);
            }
        }

        public async Task<Movie> GetMovieByIdAsync(int Id)
        {
            try
            {
                return await _movieRepository.GetMovieByIdAsync(Id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao obter o filme com o ID {Id}", ex);
            }
        }
        public async Task<List<Movie>> GetMoviesByYearAsync(int year)
        {
            var allMovies = await _movieRepository.GetAllMoviesAsync();
            return allMovies.Where(m => m.ReleaseDate.Year == year).ToList();
        }

        public async Task<Movie> AddMovieAsync(Movie movie)
        {
            try
            {
                return await _movieRepository.AddMovieAsync(movie);
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao adicionar um novo filme", ex);
            }
        }

        public async Task<Movie> UpdateMovieAsync(int id, Movie movie)
        {
            try
            {
                return await _movieRepository.UpdateMovieAsync(id, movie);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao atualizar o filme com o ID {id}", ex);
            }
        }

        public async Task<bool> DeleteMovieAsync(int id)
        {
            try
            {
                return await _movieRepository.DeleteMovieAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao excluir o filme com o ID {id}", ex);
            }
        }
        public async Task<List<Movie>> GetMoviesByGenreAsync(EGenre genre)
        {
            try
            {
                var allMovies = await _movieRepository.GetAllMoviesAsync();
                var genreInt = (int)genre; 

                return allMovies.Where(m => m.GenreIds.Contains(genreInt)).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao obter os filmes do gênero {genre}: {ex.Message}", ex);
            }
        }

        public async Task<List<Movie>> SearchMoviesByTitle(string title)
        {
            var movies = await _movieRepository.GetMoviesByTitleAsync(title);
            if (movies.Any())
            {
                var categories = movies.SelectMany(m => m.GenreIds).Distinct().ToList();
                var relatedMovies = await _movieRepository.GetMoviesByCategoriesAsync(categories);
                return relatedMovies.ToList();
            }
            return new List<Movie>();
        }

        public async Task<List<Movie>> GetMoviesByNameAsync(string name)
        {
            try
            {
                return await _movieRepository.GetMoviesByNameAsync(name);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao obter os filmes com o nome {name}", ex);
            }
        }

    }
}
