using Simulacrum.Api.DTOs.Domain;
using Simulacrum.Api.Models;

namespace Simulacrum.Api.DTOs.Responses
{
    public class CreateProjectResponseDTO : ProjectDTO
    {
        public CreateProjectResponseDTO(Project project) : base(project)
        {
        }
    }
}
