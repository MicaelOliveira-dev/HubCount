using HubFilmes.Domain.Entities;
using HubFilmes.Domain.Repositories;

namespace HubFilmes.Application.Services
{
    public class ChatService : IChatService
    {
        private readonly IChatRepository _chatRepository;

        public ChatService(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public async Task SaveMessageAsync(Message message)
        {
            await _chatRepository.SaveMessageAsync(message);
        }

        public async Task<List<Message>> GetAllMessages(int senderId, int recipientId)
        {
            return await _chatRepository.GetAllMessages(senderId, recipientId);
        }

        public async Task<Message> GetLastMessage(int senderId, int recipientId)
        {
            var currentDate = DateTime.UtcNow;
            return await _chatRepository.GetLastMessage(senderId, recipientId, currentDate);
        }
    }
}
