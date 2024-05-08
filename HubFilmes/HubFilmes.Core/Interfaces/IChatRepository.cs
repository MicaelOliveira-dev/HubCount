using HubFilmes.Domain.Entities;

namespace HubFilmes.Domain.Repositories
{
    public interface IChatRepository
    {
        Task SaveMessageAsync(Message message);
        Task<List<Message>> GetAllMessages(int senderId, int recipientId);
        Task<Message> GetLastMessage(int senderId, int recipientId, DateTime currentDate);
    }
}
