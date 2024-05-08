using Azure.Core;
using HubFilmes.Application.Hub;
using HubFilmes.Application.Services;
using HubFilmes.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace HubFilmes.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IChatService _chatService;
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IUserService userService, IChatService chatService, IHubContext<ChatHub> hubContext)
        {
            _userService = userService;
            _chatService = chatService;
            _hubContext = hubContext;
        }

        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest request)
        {
            try
            {
                // Validar o modelo de dados da requisição
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // Verificar se o remetente e o destinatário existem
                var senderExists = await _userService.GetUserByIdAsync(request.SenderId);
                var recipientExists = await _userService.GetUserByIdAsync(request.RecipientId);

                if (senderExists == null || recipientExists == null)
                    return NotFound("Remetente ou destinatário não encontrado.");

                // Enviar mensagem para o SignalR Hub
                await _hubContext.Clients.All.SendAsync("ReceiveMessage", request.SenderId, request.RecipientId, request.Content);

                // Salvar a mensagem no banco de dados
                var message = new Message
                {
                    Sender = request.SenderId,
                    Recipient = request.RecipientId,
                    Content = request.Content,
                    Data = DateTime.Now
                };

                await _chatService.SaveMessageAsync(message);

                return Ok("Mensagem enviada com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao enviar mensagem: {ex.Message}");
            }
        }

        [HttpGet("GetAllMessages")]
        public async Task<IActionResult> GetAllMessages(int senderId, int recipientId)
        {
            try
            {
                // Verificar se o remetente e o destinatário existem
                var senderExists = await _userService.GetUserByIdAsync(senderId);
                var recipientExists = await _userService.GetUserByIdAsync(recipientId);

                if (senderExists == null || recipientExists == null)
                    return NotFound("Remetente ou destinatário não encontrado.");

                // Recuperar todas as mensagens entre o remetente e o destinatário
                var messages = await _chatService.GetAllMessages(senderId, recipientId);

                // Verificar se existem mensagens
                if (messages == null || messages.Count == 0)
                    return NotFound("Nenhuma mensagem encontrada.");

                return Ok(messages);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao recuperar as mensagens: {ex.Message}");
            }
        }

        [HttpGet("GetLastMessage")]
        public async Task<IActionResult> GetLastMessage(int senderId, int recipientId)
        {
            try
            {
                // Verificar se o remetente e o destinatário existem
                var senderExists = await _userService.GetUserByIdAsync(senderId);
                var recipientExists = await _userService.GetUserByIdAsync(recipientId);

                if (senderExists == null || recipientExists == null)
                    return NotFound("Remetente ou destinatário não encontrado.");

                // Recuperar a última mensagem antes da data especificada
                var lastMessage = await _chatService.GetLastMessage(senderId, recipientId);

                if (lastMessage == null)
                    return NotFound("Nenhuma mensagem encontrada.");

                return Ok(lastMessage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao recuperar a última mensagem: {ex.Message}");
            }
        }
    }

}
