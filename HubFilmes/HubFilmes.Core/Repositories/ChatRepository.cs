using HubFilmes.Domain.Entities;
using HubFilmes.Domain.Repositories;
using HubFilmes.infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace HubFilmes.infra.Data.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly MyDbContext _dbContext;

        public ChatRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SaveMessageAsync(Message message)
        {
            try
            {
                message.Data = DateTime.Now;

                _dbContext.Messages.Add(message);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao salvar mensagem: {ex.Message}");
                throw;
            }
        }

        public async Task<List<Message>> GetAllMessages(int senderId, int recipientId)
        {
            return await _dbContext.Messages
                .Where(m => (m.Sender == senderId && m.Recipient == recipientId) || (m.Sender == recipientId && m.Recipient == senderId))
                .OrderBy(m => m.Data)
                .ToListAsync();
        }

        public async Task<Message> GetLastMessage(int senderId, int recipientId, DateTime currentDate)
        {
            return await _dbContext.Messages
                .Where(m => (m.Sender == senderId && m.Recipient == recipientId) || (m.Sender == recipientId && m.Recipient == senderId))
                .Where(m => m.Data < currentDate)
                .OrderByDescending(m => m.Data)
                .FirstOrDefaultAsync();
        }
    }
}
