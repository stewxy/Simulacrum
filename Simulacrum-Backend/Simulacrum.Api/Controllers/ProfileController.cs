using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Simulacrum.Api.Data;
using Simulacrum.Api.DTOs.Domain;
using Simulacrum.Api.DTOs.Requests;
using Simulacrum.Api.DTOs.Responses;
using Simulacrum.Api.Models;
using Simulacrum.Api.Services.Interfaces;
using System.Security.Claims;

namespace Simulacrum.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : SimulacrumController
    {
        private readonly IStorageService _storageService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITextFilterService _textFilterService;
        private readonly IProjectMapperService _projectMapperService;

        public ProfileController(IStorageService storageService, IAppRepo appRepo, 
            ITextFilterService textFilter, UserManager<ApplicationUser> userManager, IProjectMapperService projectMapperService) : base(appRepo)
        {
            _storageService = storageService;
            _userManager = userManager;
            _textFilterService = textFilter;
            _projectMapperService = projectMapperService;
        }

        [Authorize]
        [HttpPost("UploadProfilePicture")]
        public async Task<ProfilePictureURLResponseDTO> UploadProfilePicture([FromForm] ProfilePictureUploadRequestDTO pfpUploadRequestDTO)
        {
            var user = await GetLoggedInUser();
            await _storageService.UploadProfilePicture(user, pfpUploadRequestDTO.ProfilePicture);
            return new ProfilePictureURLResponseDTO()
            {
                ProfilePictureURL = await _storageService.GetProfilePictureUrl(user)
            };
        }

        [Authorize]
        [HttpGet("GetProfileOverview")]
        public async Task<ProfileDTO> GetProfileOverview()
        {
            var user = await GetLoggedInUser();
            return await GetProfile(user);
        }

        [HttpGet("GetProfileOverview/{id}")]
        public async Task<IActionResult> GetProfileOverviewForUser(string id)
        {
            var user = await _appRepo.GetUser(id);
            if (user == null)
                return BadRequest();
            return Ok(await GetProfile(user));
        }

        private async Task<ProfileDTO> GetProfile(ApplicationUser user)
        {
            List<SkillDTO> skillDTO = new List<SkillDTO>();
            List<ProjectDTO> createdProjectDTO = new List<ProjectDTO>();
            List<ProjectDTO> assignedProjectDTO = new List<ProjectDTO>();

            foreach (Skill skill in _appRepo.GetUserSkills(user))
            {
                skillDTO.Add(new SkillDTO(skill));
            }

            if (user.CreatedProjects != null)
            {
                var ucp = user.CreatedProjects;
                foreach (Project project in ucp)
                {
                    createdProjectDTO.Add(await _projectMapperService.MapProjectToDTO(project, user));
                }
            }

            var uap = _appRepo.GetUserAssignedProjects(user).ToList();
            foreach (UserAssignedProject assignedProjects in uap)
            {
                assignedProjectDTO.Add(await _projectMapperService.MapProjectToDTO(assignedProjects.Project, user));
            }

            return new ProfileDTO()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.UserName,
                Email = user.Email,
                ProfilePicFileURL = await _storageService.GetProfilePictureUrl(user),
                Skills = skillDTO,
                AssignedProjects = assignedProjectDTO,
                CreatedProjects = createdProjectDTO,
                GitHubURL = user.GitHubURL,
                DiscordURL = user.DiscordURL
            };
        }

        [Authorize]
        [HttpPost("AssignSkillsToUser")]
        public async Task<ActionResult<List<SkillDTO>>> AssignSkillsToUser(List<string> skills)
        {
            Skill s;
            var user = await GetLoggedInUser();
            List<SkillDTO> skillsResponseDto = new List<SkillDTO>();
            user.Skills = new List<Skill>();

            foreach (var skill in skills)
            {
                s =  await _appRepo.GetSkill(skill);
                if (s == null)
                {
                    s = await _appRepo.AddSkill(new Skill()
                    {
                        Name = skill
                    });
                }

                if (await _appRepo.AssignSkillToUser(user, s) != null)
                {
                    skillsResponseDto.Add(new SkillDTO(s));
                }
            }
            return Ok(skillsResponseDto);
        }

        [Authorize]
        [HttpGet("GetProfilePicURL")]
        public async Task<ProfilePictureURLResponseDTO> GetProfilePicURL()
        {
            var user = await GetLoggedInUser();
            string profilePicFileURL = await _storageService.GetProfilePictureUrl(user);
            return new ProfilePictureURLResponseDTO()
            {
                ProfilePictureURL = await _storageService.GetProfilePictureUrl(user)
            };
        }

        [Authorize]
        [HttpPost("UpdateProfile")]
        public async Task<ActionResult<ProfileDTO>> UpdateProfile(UpdateProfileRequestDTO prDTO)
        {
            ApplicationUser user = await GetLoggedInUser();
            List<Skill> skills = new List<Skill>();
            if(prDTO.Skills != null)
            {
                foreach (string skill in prDTO.Skills)
                {
                    if (_textFilterService.ContainsProfanity(skill))
                    {
                        return BadRequest("Skill name contains profanity");
                    }

                    Skill s = await _appRepo.GetSkill(skill);
                    if (s == null)
                    {
                        continue;
                    }
                    skills.Add(s);
                    //user.Skills.Add(s);
                }
                List<Skill> removedFromUser = user.Skills.Except(skills).ToList();
                foreach (Skill s in removedFromUser)
                {
                    user.Skills.Remove(s);
                }
                List<Skill> addedToUser = skills.Except(user.Skills).ToList();
                foreach (Skill s in addedToUser)
                {
                    user.Skills.Add(s);
                }
                await _appRepo.UpdateProject();
            }

            if(prDTO.FirstName != "" && prDTO.FirstName != null)
                user.FirstName = prDTO.FirstName;

            if (prDTO.LastName != "" && prDTO.LastName != null)
                user.LastName = prDTO.LastName;

            if (prDTO.Email != null)
            {
                if (await _userManager.FindByEmailAsync(prDTO.Email) != null)
                    return BadRequest("Email is already used by another user");
                user.Email = prDTO.Email;
            }

            if (prDTO.UserName != null)
            {
                if (await _userManager.FindByNameAsync(prDTO.UserName) != null)
                    return BadRequest("Username is already used by another user");
                user.UserName = prDTO.UserName;
            }

            if (prDTO.GitHubURL != "" && prDTO.GitHubURL != null)
                user.GitHubURL = prDTO.GitHubURL;

            if (prDTO.DiscordURL != "" && prDTO.DiscordURL != null)
                user.DiscordURL = prDTO.DiscordURL;

            await _appRepo.UpdateUser(user);

            return await GetProfile(user);
        }

        [Authorize]
        [HttpGet("GetProjectsCreated")]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> GetProjectsCreated()
        {
            ApplicationUser user = await GetLoggedInUser();
            List<ProjectDTO> createdProjectDTO = new List<ProjectDTO>();

            foreach (Project project in user.CreatedProjects)
            {
                createdProjectDTO.Add(await _projectMapperService.MapProjectToDTO(project, user));
            }

            return Ok(createdProjectDTO);
        }

        [Authorize]
        [HttpGet("IsLikedProject")]
        public async Task<ActionResult<bool>> IsLikedProject(int id)
        {
            ApplicationUser user = await GetLoggedInUser();
            bool IsLiked = await _appRepo.IsLiked(id, user);
            return IsLiked;
        }

        [Authorize]
        [HttpPost("RemoveLikedProjectFromUser")]
        public async Task<IActionResult> RemoveLikedProjectFromUser(int id)
        {
            Project project = await _appRepo.GetProject(id);
            if (project != null)
            {
                ApplicationUser user = await GetLoggedInUser();
                if (user != null)
                {
                    await _appRepo.RemoveLikedProjectFromUser(user, project);
                    return Ok("");
                }
                return BadRequest("Not Logged in");
            }
            return BadRequest("No such project with id");
        }
        
        [Authorize]
        [HttpPost("AddToLikedProjects")]
        public async Task<IActionResult> AddToLikedProjects(int id)
        {
            Project project = await _appRepo.GetProject(id);
            if (project != null)
            {
                ApplicationUser user = await GetLoggedInUser();
                user.LikedProjects = new List<UserLikedProject>();
                if (user != null)
                {
                    await _appRepo.AddLikedProjectToUser(user, project);
                    return Ok("");
                }
                return BadRequest("Not Logged in");
            }
            return BadRequest("No such project with id");
        }

        [Authorize]
        [HttpGet("GetLikedProjects")]
        public async Task<ActionResult<IEnumerable<ProjectDTO>>> GetLikedProjects()
        {
            ApplicationUser user = await GetLoggedInUser();

            List<ProjectDTO> likedProjects = new List<ProjectDTO>();

            foreach (Project p in _appRepo.GetUsersLikedProjects(user))
            {
                likedProjects.Add(await _projectMapperService.MapProjectToDTO(p, user));
            }
            return likedProjects;
        }



        [Authorize]
        [HttpGet("MySkills")]
        public async Task<List<SkillDTO>> MySkills()
        {
            var user = await GetLoggedInUser();
            var skillDTOs = new List<SkillDTO>();
            foreach (var skill in _appRepo.GetUserSkills(user))
            {
                skillDTOs.Add(new SkillDTO(skill));
            }
            return skillDTOs;
        }
    }
}
