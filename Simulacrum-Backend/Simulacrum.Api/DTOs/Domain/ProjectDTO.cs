using Simulacrum.Api.Models;

namespace Simulacrum.Api.DTOs.Domain
{
    public class ProjectDTO
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
        public List<ApplicationUserDTO>? AssignedUsers { get; set; }

        public bool IsAssigned { get; set; }

        public bool IsInLiked { get; set; }

        public ProjectDTO(Project project)
        {
            Id = project.Id;
            Name = project.Name;
            GoogleDriveURL = project.GoogleDriveURL;
            GitHubRepoURL = project.GitHubRepoURL;
            JiraURL = project.JiraURL;
            DiscordURL = project.DiscordURL;
            DateCreated = project.DateCreated;
            Description = project.Description;
            ProjectLead = new ApplicationUserDTO(project.Lead);
            RequiredSkills = new List<string>();
            AssignedUsers = new List<ApplicationUserDTO>();

            foreach (var skill in project.RequiredSkills)
            {
                RequiredSkills.Add(skill.Skill.Name);
            }
            foreach (UserAssignedProject user in project.AssignedUsers)
            {
                if (user.User != null)
                {
                    ApplicationUserDTO auDTO = new ApplicationUserDTO(user.User);
                    AssignedUsers.Add(auDTO);
                }
            }
        }
    }
}



