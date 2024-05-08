using System.ComponentModel.DataAnnotations;

namespace HubFilmes.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string ?Name { get; set; }
        public string ?Email { get; set; }
        public string ?Password { get; set; }
        public int? FilmesFavoritos { get; set; }
        public bool? IsDeleted { get; set; }
        public string ?LinkFoto { get; set; }
        public int Followers {  get; set; }
        public List<int>? FilmesFavoritosList { get; set; }

    }
}
