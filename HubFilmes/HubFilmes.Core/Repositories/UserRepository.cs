using HubFilmes.Domain.Entities;
using HubFilmes.infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace HubFilmes.infra.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDbContext _dbContext;

        public UserRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _dbContext.Users.FindAsync(id);
        }

        public async Task<User> RegisterUserAsync(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task UpdateAsync(User user)
        {
            _dbContext.Entry(user).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateFollowersAsync(User user)
        {
            _dbContext.Users.Attach(user);
            _dbContext.Entry(user).Property(u => u.Followers).IsModified = true;

            await _dbContext.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(User user)
        {
            user.IsDeleted = true;
            await UpdateAsync(user);
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _dbContext.Users.ToListAsync();
        }
    }
}
