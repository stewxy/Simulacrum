using Simulacrum.Api.DTOs.Domain;
using System.ComponentModel.DataAnnotations;

namespace Simulacrum.Api.DTOs.Requests
{
    public class CreateProjectRequestDTO
    {
        [Required]
        public string ProjectName { get; set; }
        public string? GoogleDriveURL { get; set; }
        public string? GitHubRepoURL { get; set; }
        public string? JiraURL { get; set; }
        public string? DiscordURL { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public List<DesiredSkillDTO> DesiredSkills { get; set; }
    }
}
