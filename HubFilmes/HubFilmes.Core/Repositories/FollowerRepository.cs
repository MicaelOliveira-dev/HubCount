using HubFilmes.Domain.Entities;
using HubFilmes.infra.Data.Context;
using HubFilmes.Infra.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace HubFilmes.Infra.Data.Repositories
{
    public class FollowerRepository : IFollowerRepository
    {
        private readonly MyDbContext _context;

        public FollowerRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task Add(Follower follower)
        {
            _context.Followers.Add(follower);
            _context.SaveChanges();
        }

        public async Task Remove(Follower follower)
        {
            _context.Followers.Remove(follower);
            _context.SaveChanges();
        }

        public async Task<List<int>> GetFollowersIds(int userId)
        {
            return _context.Followers
                .Where(f => f.SeguidoId == userId)
                .Select(f => f.SeguidorId)
                .ToList();
        }

        public async Task<List<int>> GetFollowingIds(int userId)
        {
            return _context.Followers
                .Where(f => f.SeguidorId == userId)
                .Select(f => f.SeguidoId)
                .ToList();
        }
    }
}
