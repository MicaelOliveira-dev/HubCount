using HubFilmes.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HubFilmes.infra.Data.Context
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Follower> Followers { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Follower>()
                .HasKey(f => new { f.SeguidorId, f.SeguidoId });

            modelBuilder.Entity<Follower>()
                .HasOne(f => f.Seguidor)
                .WithMany()
                .HasForeignKey(f => f.SeguidorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Follower>()
                .HasOne(f => f.Seguido)
                .WithMany()
                .HasForeignKey(f => f.SeguidoId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
