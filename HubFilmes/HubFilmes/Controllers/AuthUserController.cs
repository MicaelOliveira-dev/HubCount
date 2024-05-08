using HubFilmes.Application.DTOs;
using HubFilmes.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using HubFilmes.Application.Security; 

namespace HubFilmes.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthUserController : ControllerBase
    {
        private readonly IAuthUser _authUser;

        public AuthUserController(IAuthUser authUser)
        {
            _authUser = authUser;
        }

        [HttpPost("AuthLogin")]
        public async Task<ActionResult<UserDTO>> GetUserByNameAndPassword([FromBody] LoginDTO login)
        {
            
            string hashedPassword = PasswordHasher.HashPassword(login.Password);
            
            var user = await _authUser.GetUserByEmailAndPassword(login.Email, hashedPassword);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
