using System.ComponentModel.DataAnnotations;
namespace Simulacrum.Api.Models
{
    public class ProjectSkill
    {
        public int SkillId { get; set; }
        public virtual Skill Skill { get; set; }
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
        public float? Weight { get; set; }
    }
}
