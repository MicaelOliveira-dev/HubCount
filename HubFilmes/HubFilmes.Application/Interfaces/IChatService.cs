using HubFilmes.Domain.Entities;

namespace HubFilmes.Application.Services
{
    public interface IChatService
    {
        Task SaveMessageAsync(Message message);
        Task<List<Message>> GetAllMessages(int senderId, int recipientId);
        Task<Message> GetLastMessage(int senderId, int recipientId);
    }
}
