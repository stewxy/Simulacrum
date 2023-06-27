using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Simulacrum.Api.Models;
using Simulacrum.Api.DTOs.Requests;
using Simulacrum.Api.DTOs.Responses;
using Simulacrum.Api.Data;
using Simulacrum.Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Simulacrum.Api.DTOs.Domain;

namespace Simulacrum.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : SimulacrumController
    {
        private readonly ITextFilterService _textFilterService;
        public SkillsController(IAppRepo repo, ITextFilterService textFilter) : base(repo)
        {
            _textFilterService = textFilter;
        }

        [HttpGet]
        [Route("Skills")]
        public ActionResult<IEnumerable<SkillDTO>> GetAllSkills()
        {
            List<SkillDTO> skills = new List<SkillDTO>();
            foreach (Skill skill in _appRepo.GetAllSkills())
            {
                SkillDTO skillDTO = new SkillDTO(skill);
                skills.Add(skillDTO);
            }
            return Ok(skills);
        }

        [HttpGet]
        [Route("GetSkillsByName/{name}")]
        public ActionResult<IEnumerable<SkillDTO>> GetSkillsByName(string name)
        {
            IEnumerable<Skill> skills = _appRepo.GetSkills(name);
            List<SkillDTO> skillDTOs = new List<SkillDTO>();
            foreach (Skill s in skills)
            {
                SkillDTO skill = new SkillDTO(s);
                skillDTOs.Add(skill);
            }
            return Ok(skillDTOs);
        }

        [HttpGet]
        [Route("GetSkill/{id}")]
        public async Task<ActionResult<SkillDTO>> GetSkill(int id)
        {
            Skill skill = await _appRepo.GetSkill(id);
            if (skill == null)
            {
                return NotFound($"No such skill with id:{id} found");
            }
            SkillDTO skillDTO = new SkillDTO(skill);
            return Ok(skillDTO);
        }

        [Authorize]
        [HttpPost]
        [Route("AddSkill")]
        public async Task<ActionResult<SkillDTO>> AddSkill(SkillRequestDTO skill)
        {
            Skill s = null;
            try
            {
                if (_textFilterService.ContainsProfanity(skill.Name))
                {
                    return BadRequest("Name contains profanity.");
                }
                s = await _appRepo.AddSkill(new Skill { Name = skill.Name, Category = skill.Category });
            } catch (DbUpdateException e)
            {
                return BadRequest("Skill could not be made");
            }
            return Ok(new SkillDTO(s));
        }

        [Authorize]
        [HttpPost]
        [Route("AddSkills")]
        public async Task<ActionResult<IEnumerable<SkillDTO>>> AddSkills(IEnumerable<SkillRequestDTO> skillReqs)
        {
            var skills = new List<Skill>();
            foreach (var skillReq in skillReqs)
            {
                if (_textFilterService.ContainsProfanity(skillReq.Name))
                {
                    return BadRequest("Skill contains profanity.");
                }
                var skill = await _appRepo.AddSkill(new Skill() { Name = skillReq.Name, Category = skillReq.Category });
                if (skill != null)
                    skills.Add(skill);
            }
            return Ok(skills.Select(s => new SkillDTO(s)));
        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteSkill/{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            Skill skillToDelete = await _appRepo.GetSkill(id);
            await _appRepo.RemoveSkill(skillToDelete);
            return Ok("Skill deleted.");
        }

    }
}
