using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Simulacrum.Api.Models;

namespace Simulacrum.Api.Data
{
    public class AppRepo : IAppRepo
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public AppRepo(AppDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public IEnumerable<ApplicationUser> GetAllUsers()
        {
            return _dbContext.Users.ToList();
            
        }

        public IEnumerable<Project> GetAllProjects()
        {
            return _dbContext.Projects.ToList();
        }

        public IEnumerable<Skill> GetAllSkills()
        {
            return _dbContext.Skills.ToList();
        }

        //Gets The user's liked project
        public IEnumerable<Project> GetUsersLikedProjects(ApplicationUser user)
        {
            List<Project> likedProjects = new List<Project>();
            foreach(UserLikedProject ulp in _dbContext.Users.Include(u => u.LikedProjects).First(u => u.Id == user.Id).LikedProjects)
            {
                likedProjects.Add(ulp.Project);
            }
            return likedProjects;
            
        }

        public async Task<ApplicationUser> GetUser(string userId)
        {
            return await _dbContext.Users.Include(u => u.AssignedProjects).FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<ApplicationUser> UpdateProfilePicFileName(ApplicationUser user, string pfpFileName)
        {
            user.ProfilePicFileName = pfpFileName;
            await _dbContext.SaveChangesAsync();
            return user;
        }


        public async Task<Project> GetProject(int projId)
        {
            return await _dbContext.Projects.Include(p => p.AssignedUsers).ThenInclude(uap => uap.User).FirstOrDefaultAsync(p => p.Id == projId);
        }

        public async Task<Skill> GetSkill(int skillId)
        {
            return await _dbContext.Skills.FirstOrDefaultAsync(s => s.Id == skillId);
        }

        public async Task<Skill> GetSkill(string skill)
        {
            return await _dbContext.Skills.FirstOrDefaultAsync(s => s.Name == skill);
        }

        //Gets projects that contain {name} in its name.
        public IEnumerable<Project> GetProjects (string name)
        {
            return _dbContext.Projects.Where(p => p.Name.ToLower().Contains(name));
        }

        //Gets skills that contain {name} in its name
        public IEnumerable<Skill> GetSkills (string name)
        {
            return _dbContext.Skills.Where(s => s.Name.ToLower().Contains(name));
        }

        
        public async Task<Project> AddProject(Project project)
        {

            
            EntityEntry<Project> e =  await _dbContext.Projects.AddAsync(project);
            Project p = e.Entity;

             await _dbContext.SaveChangesAsync();
            return p;
        }

        public async Task<UserAssignedProject> AssignProjectToUser(ApplicationUser user, Project project)
        {
            var uap = new UserAssignedProject()
            {
                User = user,
                Project = project,
                Status = "Joined"
            };
            user.AssignedProjects.Add(uap);
            await _dbContext.SaveChangesAsync();
            return uap;
        }

        public async Task UnassignProjectFromUser(ApplicationUser user, Project project)
        {
            var uap = await _dbContext.UserAssignedProjects.Where(p => p.User == user && p.ProjectId == project.Id).FirstOrDefaultAsync();
            user.AssignedProjects.Remove(uap);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Skill> AssignSkillToUser(ApplicationUser user, Skill skill)
        {
            Skill s = await _dbContext.Skills.FirstOrDefaultAsync(e => e.Id == skill.Id && !e.Users.Contains(user));
            if (s != null)
            {
                user.Skills.Add(skill);
                Console.WriteLine(skill.Name);
                await _dbContext.SaveChangesAsync();
            }
            //Console.WriteLine(s == null);
            return s;
        }

        public async Task<Skill> AddSkill(Skill skill)
        {
            EntityEntry<Skill> e = await _dbContext.Skills.AddAsync(skill);
            Skill s = e.Entity;
            await _dbContext.SaveChangesAsync();
            return s;
        }
        public async Task<ApplicationUser> AddLikedProjectToUser(ApplicationUser user, Project project)
        {
            user.LikedProjects.Add(new UserLikedProject()
            {
                User = user,
                Project = project
            });
            await _dbContext.SaveChangesAsync();
            return user;
        }
        public async Task RemoveProject(Project project)
        {

            _dbContext.Remove(project);
            await _dbContext.SaveChangesAsync();
        }
        public async Task RemoveSkill(Skill skill)
        {
            _dbContext.Remove(skill);
            await _dbContext.SaveChangesAsync();
        }

        public IEnumerable<UserAssignedProject> GetUserAssignedProjects(ApplicationUser user)
        {
            return _dbContext.UserAssignedProjects.Where(e => e.UserId == user.Id & user.UserName != e.Project.Lead.UserName);
        }

        public IEnumerable<Skill> GetUserSkills(ApplicationUser user)
        {
            return _dbContext.Skills.Where(s => s.Users.Contains(user));
        }

        public IEnumerable<Project> GetFeaturedProjects()
        {
            return _dbContext.Projects.OrderBy(x => Guid.NewGuid()).Take(5).ToList();
        }

        public IEnumerable<Project> GetRecentlyCreatedProjects()
        {
            return _dbContext.Projects.OrderByDescending(p => p.DateCreated).Take(5);
        }

        public async Task<bool> IsAssigned(int id, ApplicationUser user)
        {
            UserAssignedProject project = await _dbContext.UserAssignedProjects.FirstOrDefaultAsync(u => u.ProjectId == id && u.UserId == user.Id);
            if (project == null)
                return false;
            return true;
        }
        public async Task<bool> IsLiked(int id, ApplicationUser user)
        {
            UserLikedProject project = await _dbContext.UserLikedProjects.FirstOrDefaultAsync(u => u.ProjectId == id && u.UserId == user.Id);
            if (project == null)
                return false;
            return true;
        }

        public async Task UpdateUser(ApplicationUser user)
        {
            await _userManager.UpdateAsync(user);
        }

        public async Task<ApplicationUser> RemoveLikedProjectFromUser(ApplicationUser user, Project project)
        {
            var p = await _dbContext.UserLikedProjects.Where(p => p.User == user && p.ProjectId == project.Id).FirstOrDefaultAsync();
            user.LikedProjects.Remove(p);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<ProjectSkill> AddSkillToProject(Skill skill, Project project, float weight)
        {
            ProjectSkill ps = new ProjectSkill()
            {
                Skill = skill,
                Project = project,
                Weight = weight
            };

            await _dbContext.ProjectSkills.AddAsync(ps);
            await _dbContext.SaveChangesAsync();
            return ps;
        }
        public async Task<ProjectSkill> RemoveSkillFromProject(Skill skill, Project project)
        {
            var ps = await _dbContext.ProjectSkills.Where(ps => ps.Skill == skill && ps.Project == project).FirstOrDefaultAsync();
            skill.Projects.Remove(ps);
            project.RequiredSkills.Remove(ps);
            _dbContext.ProjectSkills.Remove(ps);
            await _dbContext.SaveChangesAsync();
            return ps;

        }

        public async Task UpdateProject()
        {
            await _dbContext.SaveChangesAsync();
        }

        public bool IsProjectLead(int id, ApplicationUser user)
        {
            var p = _dbContext.Projects.FirstOrDefault(e => e.Id == id && e.Lead == user);
            return p != null;
        }
    }
}
