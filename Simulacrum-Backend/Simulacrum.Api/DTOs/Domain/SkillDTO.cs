using Simulacrum.Api.Models;

namespace Simulacrum.Api.DTOs.Domain
{
    public class SkillDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }

        public SkillDTO() { }
        public SkillDTO(int id, string name, string category)
        {
            Id = id;
            Name = name;
            Category = category;
        }

        public SkillDTO(Skill skill)
        {
            Id = skill.Id;
            Name = skill.Name;
            Category = skill.Category;
        }
    }
}
