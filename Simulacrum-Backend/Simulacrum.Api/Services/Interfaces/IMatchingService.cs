using Simulacrum.Api.Data;
using Simulacrum.Api.Models;

namespace Simulacrum.Api.Services.Interfaces
{
    public interface IMatchingService
    {
        public ICollection<Project> GetUserMatchedProjects(ApplicationUser user);
    }
}
