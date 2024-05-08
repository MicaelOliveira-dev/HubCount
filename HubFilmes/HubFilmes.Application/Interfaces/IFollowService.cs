using HubFilmes.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HubFilmes.Application.Interfaces
{
    public interface IFollowerService
    {
        Task AddFollower(FollowerDTO followerDTO);
        Task RemoveFollower(FollowerDTO followerDTO);
        Task<List<int>> GetAllFollower(int userId);   
    }
}
