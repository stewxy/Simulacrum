using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Simulacrum.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? GitHubURL { get; set; }
        public string? DiscordURL { get; set; }
        public string? ProfilePicFileName { get; set; }
        public virtual ICollection<Skill> Skills { get; set; }
        public virtual ICollection<UserAssignedProject> AssignedProjects { get; set; }
        public virtual ICollection<UserLikedProject> LikedProjects { get; set; }
        public virtual ICollection<Project> CreatedProjects { get; set; }
    }
}
