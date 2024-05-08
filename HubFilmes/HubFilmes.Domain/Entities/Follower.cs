using System.ComponentModel.DataAnnotations.Schema;

namespace HubFilmes.Domain.Entities
{
    public class Follower
    {
        public int SeguidorId { get; set; }
        public int SeguidoId { get; set; }

        [ForeignKey("SeguidorId")]
        public virtual User Seguidor { get; set; }

        [ForeignKey("SeguidoId")]
        public virtual User Seguido { get; set; }
    }
}
