using HubFilmes.Domain.Entities;

namespace HubFilmes.Application.Interfaces
{
    public interface ICommentService
    {
        Task AddComment(Comment comment);
        Task <IEnumerable<Comment>> GetCommentsByMovieId(int movieId);
    }
}
