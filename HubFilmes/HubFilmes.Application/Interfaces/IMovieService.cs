using HubFilmes.Domain.Entities;
using HubFilmes.Domain.Enums;

namespace HubFilmes.Application.Interfaces
{
    public interface IMovieService
    {
        Task<List<Movie>> GetAllMoviesAsync();
        Task<Movie> GetMovieByIdAsync(int id);
        Task<Movie> AddMovieAsync(Movie movie);
        Task<Movie> UpdateMovieAsync(int id, Movie movie);
        Task<bool> DeleteMovieAsync(int id);
        Task<List<Movie>> GetMoviesByYearAsync(int year);
        Task<List<Movie>> GetMoviesByGenreAsync(EGenre Egenre);
        Task<List<Movie>> GetMoviesByNameAsync(string name);
        Task<List<Movie>> SearchMoviesByTitle(string title);
    }
}
