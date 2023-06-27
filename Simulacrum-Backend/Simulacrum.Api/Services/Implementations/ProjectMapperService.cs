using Simulacrum.Api.Data;
using Simulacrum.Api.DTOs.Domain;
using Simulacrum.Api.Models;
using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Api.Services.Implementations
{
    public class ProjectMapperService : IProjectMapperService
    {
        private readonly IAppRepo _appRepo;

        public ProjectMapperService(IAppRepo appRepo)
        {
            _appRepo = appRepo;
        }

        public async Task<ProjectDTO> MapProjectToDTO(Project project, ApplicationUser? user)
        {
            var pDTO = new ProjectDTO(project);
            if (user == null)
                return pDTO;

            pDTO.IsAssigned = await _appRepo.IsAssigned(project.Id, user);
            pDTO.IsInLiked = await _appRepo.IsLiked(project.Id, user);
            return pDTO;
        }

        public async Task<ICollection<ProjectDTO>> MapProjectsToDTO(ICollection<Project> projects, ApplicationUser? user)
        {
            ICollection<ProjectDTO> pDTOs = new List<ProjectDTO>();
            foreach (var project in projects)
            {
                pDTOs.Add(await MapProjectToDTO(project, user));
            }
            return pDTOs;
        }
    }
}
