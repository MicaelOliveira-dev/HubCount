using HubFilmes.Application.Interfaces;
using HubFilmes.Application.Services;
using HubFilmes.Domain.Repositories;
using HubFilmes.infra.Data.Context;
using HubFilmes.infra.Data.Repositories;
using HubFilmes.Infra.Data.Interfaces;
using HubFilmes.Infra.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HubFilmes.Infra.Ioc
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfra(this IServiceCollection services, IConfiguration configuration)
        {
            // Registro do contexto do banco de dados
            services.AddDbContext<MyDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // Registro dos repositórios e serviços
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            // Registro do AuthUserService e IAuthUser
            services.AddScoped<IAuthUserRepository, AuthUserRepository>();
            services.AddScoped<IAuthUser, AuthUserService>();

            // Registro dos repostorios e serviços de Movies
            services.AddScoped<IMovieRepository, MovieRepository>();
            services.AddScoped<IMovieService, MovieService>();

            // Registro do FollowerRepository e FollowerService
            services.AddScoped<IFollowerRepository, FollowerRepository>();
            services.AddScoped<FollowerService>();

            // Registro do MessageService
            services.AddScoped<IChatRepository, ChatRepository>();
            services.AddScoped<IChatService, ChatService>();

            // Registro das interfaces e suas implementações
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<ICommentService, CommentService>();


            return services;
        }
    }
}
