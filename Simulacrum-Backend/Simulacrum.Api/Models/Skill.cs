using System.ComponentModel.DataAnnotations;
namespace Simulacrum.Api.Models
{
    public class Skill
    {
        [Key]
        public int Id { get; set; } 
        [Required]
        public string Name { get; set; }

        public virtual ICollection<ApplicationUser> Users { get; set; }
        public virtual ICollection<ProjectSkill> Projects { get; set; }
        public string? Category { get; set; }
    }
}
