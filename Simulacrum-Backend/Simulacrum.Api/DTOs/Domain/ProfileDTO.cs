using Simulacrum.Api.Models;
namespace Simulacrum.Api.DTOs.Domain
{
    public class ProfileDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string? Email { get; set; }
        public string? ProfilePicFileURL { get; set; }
        public ICollection<SkillDTO> Skills { get; set; }
        public string? GitHubURL { get; set; }
        public string? DiscordURL { get; set; }
        public ICollection<ProjectDTO> AssignedProjects { get; set; }
        public ICollection<ProjectDTO> CreatedProjects { get; set; }
    }
}
