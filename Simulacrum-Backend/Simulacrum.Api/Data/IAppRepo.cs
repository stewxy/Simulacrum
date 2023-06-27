using Simulacrum.Api.Models;
namespace Simulacrum.Api.Data
{
    public interface IAppRepo
    {
        public IEnumerable<ApplicationUser> GetAllUsers();
        public IEnumerable<Project> GetAllProjects();
        public IEnumerable<Skill> GetAllSkills();
        public IEnumerable<Project> GetUsersLikedProjects(ApplicationUser user);
        public Task<ApplicationUser> GetUser(string userId);
        public Task<ApplicationUser> UpdateProfilePicFileName(ApplicationUser user, string pfpFileName);
        public Task<Project> GetProject(int projId);
        public Task<Skill> GetSkill (int skillId);
        public Task<Skill> GetSkill(string skill);
        public IEnumerable<Project> GetProjects (string name);
        public IEnumerable<Skill> GetSkills (string name);
        public Task<Project> AddProject(Project project);
        public Task<UserAssignedProject> AssignProjectToUser(ApplicationUser user, Project project);
        public Task UnassignProjectFromUser(ApplicationUser user, Project project);
        public Task<Skill> AssignSkillToUser(ApplicationUser user, Skill skill);
        public Task<Skill> AddSkill(Skill skill);
        public Task<ApplicationUser> AddLikedProjectToUser(ApplicationUser user, Project project);
        public Task RemoveProject(Project project);
        public Task RemoveSkill(Skill skill);
        public IEnumerable<UserAssignedProject> GetUserAssignedProjects(ApplicationUser user);
        public IEnumerable<Skill> GetUserSkills(ApplicationUser user); 
        public IEnumerable<Project> GetFeaturedProjects();
        public IEnumerable<Project> GetRecentlyCreatedProjects();
        public Task<bool> IsAssigned(int id, ApplicationUser user);
        public Task<bool> IsLiked(int id, ApplicationUser user);
        public Task UpdateUser(ApplicationUser user);
        public Task<ApplicationUser> RemoveLikedProjectFromUser(ApplicationUser user, Project project);
        public Task<ProjectSkill> AddSkillToProject(Skill skill, Project project, float weight);
        public Task<ProjectSkill> RemoveSkillFromProject(Skill skill, Project project);
        public Task UpdateProject();
        public bool IsProjectLead(int id, ApplicationUser user);
    }
}
