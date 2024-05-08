using HubFilmes.Application.Interfaces;
using HubFilmes.Domain.Entities;
using HubFilmes.Infra.Data.Interfaces;

namespace HubFilmes.Application.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task AddComment(Comment comment)
        {
            await _commentRepository.AddComment(comment);
        }

        public async Task<IEnumerable<Comment>> GetCommentsByMovieId(int movieId)
        {
            var comments = await _commentRepository.GetCommentsByMovieId(movieId);
            return comments;
        }

    }
}
