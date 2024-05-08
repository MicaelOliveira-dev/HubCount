using HubFilmes.Domain.Entities;

namespace HubFilmes.infra.Data.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(int id);
        Task <List<User>> GetAllAsync();        
        Task<User> RegisterUserAsync(User user);
        Task UpdateAsync(User user);
        Task UpdateFollowersAsync(User user);
        Task SoftDeleteAsync(User user);
    }
}

