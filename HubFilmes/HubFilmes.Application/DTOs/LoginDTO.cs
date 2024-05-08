using System.ComponentModel.DataAnnotations;

namespace HubFilmes.Application.DTOs
{
    public class LoginDTO
    {
        [EmailAddress(ErrorMessage = "E-mail inválido.")]
        [Required(ErrorMessage = "O campo E-mail é obrigatório.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        public string Password { get; set; }
    }
}
