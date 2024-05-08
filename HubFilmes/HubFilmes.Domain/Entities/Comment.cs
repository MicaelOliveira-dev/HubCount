

namespace HubFilmes.Domain.Entities
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int UserId { get; set; } 
        public int MovieId { get; set; }
        public string CommentText { get; set; } 
        public DateTime CommentDate { get; set; }
        public string Name { get; set; }
        public string LinkFoto { get; set; }
    }
}
