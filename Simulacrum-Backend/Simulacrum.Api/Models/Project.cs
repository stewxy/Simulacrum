using System.ComponentModel.DataAnnotations;

namespace Simulacrum.Api.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public virtual ApplicationUser Lead { get; set; }
        public string? GoogleDriveURL { get; set; }
        public string? GitHubRepoURL { get; set; }
        public string? JiraURL { get; set; }
        public string? DiscordURL { get; set; }
        public DateTime DateCreated { get; set; }
        public string Description { get; set; }
        public virtual ICollection<ProjectSkill> RequiredSkills { get; set; }
        public virtual ICollection<UserAssignedProject> AssignedUsers { get; set; }
        public virtual ICollection<UserLikedProject> LikesFromUsers { get; set; }
        public int? MaxUsers { get; set; }
    }
}
