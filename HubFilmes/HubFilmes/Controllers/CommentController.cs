using HubFilmes.Application.Interfaces;
using HubFilmes.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HubFilmes.API.Controllers
{
    [Route("api/comments")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment([FromBody] Comment comment)
        {
            await _commentService.AddComment(comment);
            return Ok("Comentário adicionado com sucesso.");
        }

        [HttpGet("GetCommentsMovie/{movieId}")]
        public async Task<IActionResult> GetCommentsByMovieId(int movieId)
        {
            try
            {
                var comments = await _commentService.GetCommentsByMovieId(movieId);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
