using HubFilmes.Application.DTOs;
using HubFilmes.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace HubFilmes.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FollowerController : ControllerBase
    {
        private readonly FollowerService _followerService;

        public FollowerController(FollowerService followerService)
        {
            _followerService = followerService;
        }

        [HttpGet("GetAllFollowersById/{id}")]
        public async Task<IActionResult> GetAllFollowersById(int id)
        {
            try
            {
                var followers = await _followerService.GetAllFollower(id);
                return Ok(followers);
            }
            catch (DllNotFoundException)
            {
                return BadRequest("Usuário não encontrado");
            }
        }

        [HttpPost("follow")]
        public async Task<IActionResult> FollowUser(FollowerDTO followerDTO)
        {
            try
            {
                await _followerService.AddFollower(followerDTO);
                return Ok();
            }
            catch (DllNotFoundException)
            {
                return BadRequest("Usuario já está seguindo");
            }
        }


        [HttpPost("unfollow")]
        public async Task<IActionResult> UnfollowUser(FollowerDTO followerDTO)
        {
            try
            {
                await _followerService.RemoveFollower(followerDTO);
                return Ok();
            }
            catch (DllNotFoundException)
            {
                return BadRequest("O seguidor não está seguindo o usuário.");
            }
            
        }
    }
}
