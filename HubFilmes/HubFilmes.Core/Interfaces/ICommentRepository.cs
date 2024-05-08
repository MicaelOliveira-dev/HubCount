using HubFilmes.Domain.Entities;

namespace HubFilmes.Infra.Data.Interfaces
{
    public interface ICommentRepository
    {
        Task AddComment(Comment comment);
        Task <IEnumerable<Comment>> GetCommentsByMovieId(int movieId);
    }
}
