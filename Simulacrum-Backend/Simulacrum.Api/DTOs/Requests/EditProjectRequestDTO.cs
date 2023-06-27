using Simulacrum.Api.Models;

namespace Simulacrum.Api.DTOs.Requests
{
    public class EditProjectRequestDTO
    {
        public string? Name { get; set; }
        public string? GoogleDriveURL { get; set; }
        public string? GitHubRepoURL { get; set; }
        public string? JiraURL { get; set; }
        public string? DiscordURL { get; set; }
        public string? Description { get; set; }
    }
}



