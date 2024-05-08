using HubFilmes.Domain.Entities;
using HubFilmes.Domain.Enums;

namespace HubFilmes.infra.Data.Repositories
{
    public interface IMovieRepository
    {
        Task<List<Movie>> GetAllMoviesAsync();
        Task<Movie> GetMovieByIdAsync(int id);
        Task<Movie> AddMovieAsync(Movie movie);
        Task<Movie> UpdateMovieAsync(int id, Movie movie);
        Task<bool> DeleteMovieAsync(int id);
        Task<List<Movie>> GetMoviesByGenreAsync(EGenre genre);
        Task<List<Movie>> GetMoviesByNameAsync(string name);
        Task<IEnumerable<Movie>> GetMoviesByTitleAsync(string title);
        Task<IEnumerable<Movie>> GetMoviesByCategoriesAsync(List<int> categories);

    }
}
