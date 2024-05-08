using System.ComponentModel.DataAnnotations;

namespace HubFilmes.Application.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string ?Name { get; set; }

        [Required(ErrorMessage = "O campo E-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "E-mail inválido.")]
        public string ?Email { get; set; }

        [Required(ErrorMessage = "O campo Password é obrigatório.")]
        public string ?Password { get; set; }
        public int? FilmesFavoritos { get; set; }
        public string ?LinkFoto { get; set; }
        public int Followers { get; set; }
        public List<int>? FilmesFavoritosList { get; set; }

    }
}
