using HubFilmes.Application.DTOs;
using HubFilmes.Application.Interfaces;
using HubFilmes.Domain.Entities;
using HubFilmes.infra.Data.Repositories;
using HubFilmes.Infra.Data.Interfaces;

namespace HubFilmes.Application.Services
{
    public class FollowerService : IFollowerService
    {
        private readonly IFollowerRepository _followerRepository;
        private readonly IUserRepository _userRepository;


        public FollowerService(IFollowerRepository followerRepository, IUserRepository userRepository)
        {
            _followerRepository = followerRepository;
            _userRepository = userRepository;
        }

        public async Task AddFollower(FollowerDTO followerDTO)
        {
            var followingIds = await _followerRepository.GetFollowingIds(followerDTO.SeguidorId);
            if (!followingIds.Contains(followerDTO.SeguidoId))
            {
                var follower = new Follower
                {
                    SeguidorId = followerDTO.SeguidorId,
                    SeguidoId = followerDTO.SeguidoId
                };
                await _followerRepository.Add(follower);
                var followedUser = await _userRepository.GetByIdAsync(followerDTO.SeguidoId);
                if (followedUser != null)
                {
                    followedUser.Followers++;
                    await _userRepository.UpdateFollowersAsync(followedUser);
                }
                else
                {
                    throw new DllNotFoundException("O usuário seguido não foi encontrado.");
                }
            }
            else
            {
                throw new DllNotFoundException("O seguidor já está seguindo o usuário.");
            }
        }

        public  async Task<List<int>> GetAllFollower(int userId)
        {
            var followers = await _followerRepository.GetFollowingIds(userId);
            return followers.ToList();
        }

        public async Task RemoveFollower(FollowerDTO followerDTO)
        {
            var followingIds = await _followerRepository.GetFollowingIds(followerDTO.SeguidorId);
            if (followingIds.Contains(followerDTO.SeguidoId))
            {
                var follower = new Follower
                {
                    SeguidorId = followerDTO.SeguidorId,
                    SeguidoId = followerDTO.SeguidoId
                };
                 await _followerRepository.Remove(follower);

                var followedUser = await _userRepository.GetByIdAsync(followerDTO.SeguidoId);
                if (followedUser != null)
                {
                    followedUser.Followers--;
                    await _userRepository.UpdateAsync(followedUser);
                }
                else
                {
                    throw new InvalidOperationException("O usuário que perdeu o seguidor não foi encontrado.");
                }
            }
            else
            {
                throw new InvalidOperationException("O seguidor não está seguindo o usuário.");
            }
        }

    }
}
