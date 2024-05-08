using HubFilmes.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HubFilmes.Infra.Data.Interfaces
{
    public interface IAuthUserRepository
    {
        Task<User> GetUserByEmailAndPassword(string email, string password);
    }
}
