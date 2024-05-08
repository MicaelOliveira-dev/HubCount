using HubFilmes.Application.Services;
using HubFilmes.Domain.Entities;
using Microsoft.AspNetCore.SignalR;

namespace HubFilmes.Application.Hub
{
    public class ChatHub : Microsoft.AspNetCore.SignalR.Hub
    {
        private readonly IChatService _chatService;
         
        public ChatHub(IChatService chatService)
        {
            _chatService = chatService;
        }

        public async Task SendMessage(int senderId, int recipientId, string messageContent)
        {
            await Clients.All.SendAsync("ReceiveMessage", senderId, recipientId, messageContent);
            await _chatService.SaveMessageAsync(new Message { Sender = senderId, Recipient = recipientId, Content = messageContent });
        }
    }
}
