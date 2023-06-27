using Microsoft.AspNetCore.Mvc;
using Simulacrum.Api.Data;
using Simulacrum.Api.Models;
using System.Security.Claims;

namespace Simulacrum.Api.Controllers
{
    public class SimulacrumController : ControllerBase
    {
        protected readonly IAppRepo _appRepo;

        public SimulacrumController(IAppRepo appRepo)
        {
            _appRepo = appRepo;
        }

        protected async Task<ApplicationUser> GetLoggedInUser()
        {
            return await _appRepo.GetUser(User.FindFirstValue("id"));
        }

        protected bool IsLoggedIn()
        {
            return User.Identity.IsAuthenticated;
        }
    }
}
