using System.ComponentModel.DataAnnotations;

namespace Simulacrum.Api.DTOs.Requests
{
    public class UpdateProfileRequestDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        
        [EmailAddress]
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public List<string>? Skills { get; set; }
        public string? GitHubURL { get; set; }
        public string? DiscordURL { get; set; }
    }
}
