using HubFilmes.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HubFilmes.Infra.Data.Interfaces
{
    public interface IFollowerRepository
    {
        Task Add(Follower follower);
        Task Remove(Follower follower);
        Task<List<int>> GetFollowersIds(int userId);
        Task<List<int>> GetFollowingIds(int userId);
    }
}
