using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Simulacrum.Api.Data;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http.Headers;
using System.Diagnostics;
using Simulacrum.Api.DTOs.Responses;
using Simulacrum.Api.DTOs.Requests;
using Simulacrum.Api.Services.Interfaces;
using Simulacrum.Api.Services.Implementations;

namespace Simulacrum.Tests
{
    public class IntegrationTest
    {
        protected readonly HttpClient _httpClient;
        private bool _userCreated;
        protected IServiceProvider _serviceProvider;

        protected IntegrationTest()
        {
            var webAppFactory = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureServices(services =>
                    {
                        var desc = services.SingleOrDefault(
                            d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
                        services.Remove(desc);
                        desc = services.SingleOrDefault(
                            d => d.ServiceType == typeof(IAppRepo));
                        services.Remove(desc);
                        desc = services.SingleOrDefault(
                            d => d.ServiceType == typeof(IEmailNotificationService));
                        services.Remove(desc);
                        services.AddDbContext<AppDbContext>(options =>
                        {
                            options.UseInMemoryDatabase("InMemoryTestingDB");
                        });
                        services.AddScoped<IAppRepo, AppRepo>();
                        services.AddSingleton<IEmailNotificationService, MockEmailNotificationService>();
                        

                        _serviceProvider = services.BuildServiceProvider();
                    });
                });
            _httpClient = webAppFactory.CreateDefaultClient();
            _userCreated = false;
        }

        protected async Task AuthenticateAsync()
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await GetJwtAsync());
        }

        private async Task<string> GetJwtAsync()
        {
            LoginResponseDTO response;
            if (!_userCreated)
            {
                var res = await _httpClient.PostAsJsonAsync("api/Auth/Register", new RegisterRequestDTO()
                {
                    Username = "some_username",
                    Email = "some_email2@yahoo.com",
                    Password = "#Test123456789",
                    FirstName = "Test",
                    LastName = "User"
                });
                response = await res.Content.ReadAsAsync<LoginResponseDTO>();
            } else
            {
                var res = await _httpClient.PostAsJsonAsync("api/Auth/Login", new LoginRequestDTO()
                {
                    Username = "some_username",
                    Password = "#Test123456789"
                });
                response = await res.Content.ReadAsAsync<LoginResponseDTO>();
            }

            return response.Token;
        }
    }
}
