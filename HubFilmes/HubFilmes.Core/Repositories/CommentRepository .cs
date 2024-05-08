using HubFilmes.Domain.Entities;
using HubFilmes.infra.Data.Context;
using HubFilmes.Infra.Data.Interfaces;

namespace HubFilmes.Infra.Data.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly MyDbContext _dbContext;

        public CommentRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddComment(Comment comment)
        {
            await _dbContext.Comments.AddAsync(comment);
            _dbContext.SaveChanges();
        }

        public async Task<IEnumerable<Comment>> GetCommentsByMovieId(int movieId)
        {
            return _dbContext.Comments.Where(c => c.MovieId == movieId).ToList();
        }

    }

}
