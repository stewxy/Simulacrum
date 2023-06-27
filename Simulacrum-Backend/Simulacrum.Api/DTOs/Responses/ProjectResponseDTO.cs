using Simulacrum.Api.DTOs.Domain;

namespace Simulacrum.Api.DTOs.Responses
{
    public class ProjectResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ApplicationUserDTO ProjectLead { get; set; }
        public string? GoogleDriveURL { get; set; }
        public string? GitHubRepoURL { get; set; }
        public string? JiraURL { get; set; }
        public string? DiscordURL { get; set; }
        public DateTime DateCreated { get; set; }
        public string Description { get; set; }
        public List<string> RequiredSkills { get; set; }
    }
}
