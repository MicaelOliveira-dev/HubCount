using HubFilmes.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HubFilmes.Application.Interfaces
{
    public interface IAuthUser
    {
        Task<UserDTO> GetUserByEmailAndPassword(string email, string password);
    }
}
