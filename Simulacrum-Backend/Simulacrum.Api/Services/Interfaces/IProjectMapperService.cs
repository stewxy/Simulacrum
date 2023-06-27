using Simulacrum.Api.DTOs.Domain;
using Simulacrum.Api.Models;

namespace Simulacrum.Api.Services.Interfaces
{
    public interface IProjectMapperService
    {
        public Task<ProjectDTO> MapProjectToDTO(Project project, ApplicationUser? user);
        public Task<ICollection<ProjectDTO>> MapProjectsToDTO(ICollection<Project> projects, ApplicationUser? user);
    }
}
