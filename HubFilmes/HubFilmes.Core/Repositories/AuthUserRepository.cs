using HubFilmes.Domain.Entities;
using HubFilmes.infra.Data.Context;
using HubFilmes.Infra.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace HubFilmes.Infra.Data.Repositories
{
    public class AuthUserRepository : IAuthUserRepository
    {
        private readonly MyDbContext _dbContext;

        public AuthUserRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> GetUserByEmailAndPassword(string email, string password)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password && (u.IsDeleted == null || u.IsDeleted == false));

            return user;
        }
    }
}
