using HubFilmes.Domain.Entities;
using HubFilmes.Domain.Enums;
using HubFilmes.infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace HubFilmes.infra.Data.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly MyDbContext _context;

        public MovieRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<Movie>> GetAllMoviesAsync()
        {
            try
            {
                var movies = await _context.Movies.ToListAsync();
                return movies.Select(MapToDTO).ToList();
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
                var movie = await _context.Movies.FindAsync(Id);
                return movie != null ? MapToDTO(movie) : null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao obter o filme com o ID {Id}", ex);
            }
        }

        public async Task<Movie> AddMovieAsync(Movie movieAdd)
        {
            try
            {
                var movie = MapToEntity(movieAdd);
                _context.Movies.Add(movie);
                await _context.SaveChangesAsync();
                return MapToDTO(movie);
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
                var existingMovie = await _context.Movies.FindAsync(id);
                if (existingMovie == null)
                    return null;

                existingMovie.OriginalTitle = movie.OriginalTitle;
                existingMovie.Overview = movie.Overview;

                _context.Movies.Update(existingMovie);
                await _context.SaveChangesAsync();
                return MapToDTO(existingMovie);
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
                var existingMovie = await _context.Movies.FindAsync(id);
                if (existingMovie == null)
                    return false;

                _context.Movies.Remove(existingMovie);
                await _context.SaveChangesAsync();
                return true;
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
                var genreInt = (int)genre; 
                var movies = await _context.Movies.Where(m => m.GenreIds.Contains(genreInt)).ToListAsync();
                return movies;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao obter os filmes do gênero {genre}: {ex.Message}", ex);
            }
        }

        public async Task<List<Movie>> GetMoviesByNameAsync(string name)
        {
            try
            {
                var movies = await _context.Movies
                    .Where(m => m.OriginalTitle.Contains(name))
                    .ToListAsync();
                return movies.Select(MapToDTO).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao obter os filmes com o nome {name}", ex);
            }
        }

        public async Task<IEnumerable<Movie>> GetMoviesByTitleAsync(string title)
        {
            return await _context.Movies
                .Where(m => m.OriginalTitle.Contains(title))
                .ToListAsync();
        }

        public async Task<IEnumerable<Movie>> GetMoviesByCategoriesAsync(List<int> categories)
        {
            return await _context.Movies
                .Where(m => m.GenreIds.Any(c => categories.Contains(c)))
                .ToListAsync();
        }

        private Movie MapToDTO(Movie movie)
        {
            return new Movie
            {
                Id = movie.Id,
                Adult = movie.Adult,
                BackdropPath = movie.BackdropPath,
                GenreIds = movie.GenreIds,
                OriginalTitle = movie.OriginalTitle,
                Overview = movie.Overview,
                PosterPath = movie.PosterPath,
                ReleaseDate = movie.ReleaseDate,
                VoteAverage = movie.VoteAverage,
                VoteCount = movie.VoteCount,
                Duration = movie.Duration,
                Budget = movie.Budget,
                BoxOffice = movie.BoxOffice,
                Liked = movie.Liked,
                DidNotLike = movie.DidNotLike,
                Synopsis = movie.Synopsis,
                Producers = movie.Producers,
            };
        }

        private Movie MapToEntity(Movie movie)
        {
            return new Movie
            {
                Id = movie.Id,
                Adult = movie.Adult,
                BackdropPath = movie.BackdropPath,
                GenreIds = movie.GenreIds,
                OriginalTitle = movie.OriginalTitle,
                Overview = movie.Overview,
                PosterPath = movie.PosterPath,
                ReleaseDate = movie.ReleaseDate,
                VoteAverage = movie.VoteAverage,
                VoteCount = movie.VoteCount,
                Duration = movie.Duration,
                Budget = movie.Budget,
                BoxOffice = movie.BoxOffice,
                Liked = movie.Liked,
                DidNotLike = movie.DidNotLike,
                Synopsis = movie.Synopsis,
                Producers = movie.Producers,
            };
        }
        
    }
}
