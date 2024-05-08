

namespace HubFilmes.Domain.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int Sender { get; set; }
        public int Recipient { get; set; }
        public string Content { get; set; }
        public DateTime Data { get; set; }
    }
}
