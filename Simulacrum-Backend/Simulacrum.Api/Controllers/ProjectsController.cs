using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Simulacrum.Api.Data;
using Simulacrum.Api.DTOs.Domain;
using Simulacrum.Api.DTOs.Requests;
using Simulacrum.Api.DTOs.Responses;
using Simulacrum.Api.Models;
using System.Security.Claims;
using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : SimulacrumController
    {

        private readonly ITextFilterService _textFilterService;
        private readonly ITagFilterService _tagFilterService;
        private readonly IEmailNotificationService _emailNotificationService;
        private readonly IMatchingService _matchingService;
        private readonly IProjectMapperService _projectMapperService;

        public ProjectsController(IAppRepo appRepo, ITextFilterService textFilter, ITagFilterService tagFilter, 
            IEmailNotificationService emailNotificationService, IMatchingService matchingService, IProjectMapperService projectMapperService) : base(appRepo)
        {
            _textFilterService = textFilter;
            _tagFilterService = tagFilter;
            _emailNotificationService = emailNotificationService;
            _matchingService = matchingService;
            _projectMapperService = projectMapperService;
        }
        [Authorize]
        [HttpPost("Create")]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectRequestDTO createProjectRequestDTO)
        {
            //TagFilterService tagFilter = new TagFilterService()
            var user = await GetLoggedInUser();
            
            if (_textFilterService.ContainsProfanity(createProjectRequestDTO.ProjectName))
            {
                return BadRequest("Project name contains profanity.");
            } else if (_textFilterService.ContainsProfanity(createProjectRequestDTO.Description))
            {
                return BadRequest("Project description contains profanity.");
            }
            var project = new Project()
            {
                Name = createProjectRequestDTO.ProjectName,
                Lead = user,
                Description = createProjectRequestDTO.Description,
                DateCreated = DateTime.Now,
                JiraURL = createProjectRequestDTO.JiraURL,
                DiscordURL = createProjectRequestDTO.DiscordURL,
                GoogleDriveURL = createProjectRequestDTO.GoogleDriveURL,
                GitHubRepoURL = createProjectRequestDTO.GitHubRepoURL
                //,RequiredSkills = skills
            };

            foreach (var desiredSkill in createProjectRequestDTO.DesiredSkills)
            {
                string skillName = desiredSkill.Name;
                if (_textFilterService.ContainsProfanity(skillName))
                {
                    return BadRequest("Skill contains profanity.");
                }
                var s = await _appRepo.GetSkill(skillName);

                // We'll allow skills to be dynamically created for testing purposes.
                // However, this won't be exposed on the frontend.
                if (s == null)
                    s = await _appRepo.AddSkill(new Skill { Name = skillName});
                await _appRepo.AddSkillToProject(s, project, desiredSkill.Weight);
            }
            //project = await _appRepo.AddProject(project);
            await _appRepo.AssignProjectToUser(user, project);
            //return Ok(new CreateProjectResponseDTO(project));
            return Ok(await _projectMapperService.MapProjectToDTO(project, user));
        }

        [Authorize]
        [HttpDelete("Delete")]
        public async  Task<IActionResult> DeleteProject(ProjectRequestDTO proj)
        {
            Project project = await _appRepo.GetProject(proj.ID);
            if(proj == null)
            {
                return BadRequest("No such project");
            }
            else if(project.Lead.Id != (await GetLoggedInUser()).Id)
            {
                return BadRequest("Not your project");
            }
            await _appRepo.RemoveProject(project);
            return NoContent();
        }

        //Can be updated to also send associated skills if needed.
        [HttpPost("SearchProjectsByString/{str}")]
        [Authorize]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> SearchProjects(string str)
        {
            List<Project> projects = _appRepo.GetProjects(str).ToList();
            IEnumerable<ProjectDTO> projectDTOs = await _projectMapperService.MapProjectsToDTO(projects, IsLoggedIn() ? await GetLoggedInUser() : null);
            return Ok(projectDTOs);
        }

        [Authorize]
        [AllowAnonymous]
        [HttpPost("SearchProjectsBySkills")]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> SearchProjectsBySkills(IEnumerable<string> skills_requested)
        {
            List<Skill> skills = new List<Skill>();
            var user = IsLoggedIn() ? await GetLoggedInUser() : null;
            List<ProjectDTO> projects = new List<ProjectDTO>();
            foreach(var skill in skills_requested)
            {
                skills.Add(await _appRepo.GetSkill(skill));
            }
            foreach(Project project in _appRepo.GetAllProjects().ToList())
            {
                foreach(var skill in project.RequiredSkills)
                {
                    if (skills.Contains(skill.Skill))
                    {
                        projects.Add(new ProjectDTO(project));
                        break;
                    }
                }
            }
            return Ok(projects);
        }

        [Authorize]
        [AllowAnonymous]
        [HttpGet("SearchProjectsById/{id}")]
        public async Task<ActionResult<ProjectDTO>> getProjectById(int id)
        {
            var user = IsLoggedIn() ? await GetLoggedInUser() : null;
            Project project = await _appRepo.GetProject(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(await _projectMapperService.MapProjectToDTO(project, user));
        }

        [Authorize]
        [HttpPost("AssignToUser/{id}")]
        public async  Task<IActionResult> assignProjectToUser(int id)
        {
            var project = await _appRepo.GetProject(id);
            if (project != null)
            {
                ApplicationUser user = await GetLoggedInUser();
                if (user != null)
                {
                    if(await _appRepo.IsAssigned(id, user)){
                        return BadRequest("This project is already assigned to you");
                    }

                    await _appRepo.AssignProjectToUser(user, project);
                    _emailNotificationService.NotifyEmail(user.Email, "Successfully joined project", $"You have successfully joined project: {project.Name}");
                    _emailNotificationService.NotifyEmail(project.Lead.Email, "User has joined your project", $"{user.UserName} has joined your project: {project.Name}");
                    return Ok("");
                }
                return BadRequest("Not Logged in");
            }
            return BadRequest("No such project with id");
        }

        [Authorize]
        [HttpPost("UnassignProjectFromUser")]
        public async Task<ActionResult> UnassignProjectFromUser(ProjectRequestDTO projectRequest)
        {
            var user = await GetLoggedInUser();

            Project project = await _appRepo.GetProject(projectRequest.ID);
            if (project != null && project.Lead != user)
            {
                await _appRepo.UnassignProjectFromUser(user, project);
                _emailNotificationService.NotifyEmail(user.Email, "Successfully left the project", $"You have successfully left project: {project.Name}");
                _emailNotificationService.NotifyEmail(project.Lead.Email, "User has left your project", $"{user.UserName} has left your project: {project.Name}");
            }
            return NoContent();
        }

        [Authorize]
        [AllowAnonymous]
        [HttpGet(("GetAllProjects"))]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> getAllProjects()
        {
            List<ProjectDTO> allProjects = new List<ProjectDTO>();
            var user = IsLoggedIn() ? await GetLoggedInUser() : null;
            foreach (Project project in _appRepo.GetAllProjects())
            {
                allProjects.Add(await _projectMapperService.MapProjectToDTO(project, user));
            };
            return Ok(allProjects);
        }

        [Authorize]
        [HttpGet("MyProjects")]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> myProjects()
        {
            ApplicationUser user = await GetLoggedInUser();
            List<ProjectDTO> assignedProjectsToUser = new List<ProjectDTO>();

            foreach (UserAssignedProject assignedProjects in _appRepo.GetUserAssignedProjects(user).ToList())
            {
                assignedProjectsToUser.Add(await _projectMapperService.MapProjectToDTO(assignedProjects.Project, user));
            };
            return Ok(assignedProjectsToUser);
        }

        [Authorize]
        [AllowAnonymous]
        [HttpGet("GetFeaturedProjects")]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> getFeaturedProjects()
        {
            var user = IsLoggedIn() ? await GetLoggedInUser() : null;
            List<ProjectDTO> featuredProjects = new List<ProjectDTO>();
            foreach (Project project in _appRepo.GetFeaturedProjects())
            {
                featuredProjects.Add(await _projectMapperService.MapProjectToDTO(project, user));
            };
            return Ok(featuredProjects);
        }

        [Authorize]
        [AllowAnonymous]
        [HttpGet("GetRecentlyCreatedProjects")]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> GetRecentlyCreatedProjects()
        {
            var user = IsLoggedIn() ? await GetLoggedInUser() : null;
            List<ProjectDTO> recentProjects = new List<ProjectDTO>();
            foreach (Project project in _appRepo.GetRecentlyCreatedProjects().ToList())
            {
                recentProjects.Add(await _projectMapperService.MapProjectToDTO(project, user));
            };
            return Ok(recentProjects);
        }

        [Authorize]
        [HttpGet("IsAssigned")]
        public async Task<ActionResult<IsAssignedDTO>> IsAssigned(int id)
        {
            ApplicationUser user = await GetLoggedInUser();

            bool amIAssigned = await _appRepo.IsAssigned(id, user);

            IsAssignedDTO returnIsAssignedDTO = new IsAssignedDTO()
            {
                assigned = amIAssigned
            };
            return returnIsAssignedDTO;
        }

        [Authorize]
        [AllowAnonymous]
        [HttpGet("GetRelatedProjects/{id}")]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> GetRelatedProjects(int id)
        {
            var user = IsLoggedIn() ? await GetLoggedInUser() : null;
            List<ProjectDTO> relatedProjects = new List<ProjectDTO>();
            List<Project> projects = _appRepo.GetAllProjects().ToList();
            Project p = projects.FirstOrDefault(p => p.Id == id);
            int allowed_diff = 5; // Modify value to change the allowed amount of skills the other project has different.
            if (p == null)
            {
                return BadRequest("No such project");
            }
            foreach (Project project in projects)
            {
                List<ProjectSkill> difference = project.RequiredSkills.Except(p.RequiredSkills).ToList();
                if (difference.Count <= allowed_diff)
                {
                    relatedProjects.Add(await _projectMapperService.MapProjectToDTO(project, user));
                }
            }
            return Ok(relatedProjects);
        }

        [Authorize]
        [HttpGet("UserMatchedProjects")]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> GetMatchedProjects()
        {
            ApplicationUser user = await GetLoggedInUser();
            return Ok(await _projectMapperService.MapProjectsToDTO(_matchingService.GetUserMatchedProjects(user), user));
        }

        [Authorize]
        [HttpPost("EditProject")]
        public async Task<ActionResult<ProjectDTO>> EditProject(int id, EditProjectRequestDTO eprDTO)
        {
            ApplicationUser user = await GetLoggedInUser();

            Project project = await _appRepo.GetProject(id);
            if (project == null)
            {
                return NotFound();
            }

            if(project.Lead.UserName != user.UserName)
            {
                return BadRequest("You are not the leader of this project.");
            }

            if (eprDTO.Name != "" && eprDTO.Name != null)
                project.Name = eprDTO.Name;

            if (eprDTO.GoogleDriveURL != "" && eprDTO.GoogleDriveURL != null)
                project.GoogleDriveURL = eprDTO.GoogleDriveURL;

            if (eprDTO.GitHubRepoURL != "" && eprDTO.GitHubRepoURL != null)
                project.GitHubRepoURL = eprDTO.GitHubRepoURL;

            if (eprDTO.JiraURL != "" && eprDTO.JiraURL != null)
                project.JiraURL = eprDTO.JiraURL;

            if (eprDTO.DiscordURL != "" && eprDTO.Name != null)
                project.DiscordURL = eprDTO.DiscordURL;

            if (eprDTO.Description != "" && eprDTO.Description != null)
                project.Description = eprDTO.Description;

            await _appRepo.UpdateProject();

            return Ok(await _projectMapperService.MapProjectToDTO(project, user));
        }

        [HttpGet("IsProjectLead")]
        public async Task<ActionResult<IsLeadDTO>> IsProjectLead(int id)
        {
            ApplicationUser user = await GetLoggedInUser();
            bool isProjLead = _appRepo.IsProjectLead(id, user);
            IsLeadDTO isLeadDto = new IsLeadDTO()
            {
                IsLead = isProjLead
            };
            return isLeadDto;
        }

        [Authorize]
        [HttpPost("KickUser")]
        public async Task<ActionResult> KickUser(int projId, string userId)
        {
            ApplicationUser user = await GetLoggedInUser();
            Project p = await _appRepo.GetProject(projId);
            if(p.Lead != user)
            {
                return Unauthorized("Not your project");
            } else if(p == null)
            {
                return BadRequest("No such project");
            }
            foreach (UserAssignedProject uap in p.AssignedUsers)
            {
                if (uap.UserId == userId)
                {
                    p.AssignedUsers.Remove(uap);
                    await _appRepo.UpdateProject();
                    return Ok();

                }
            }
            return BadRequest("User not in project");
        }
    }
}
