using System.ComponentModel.DataAnnotations;

namespace Simulacrum.Api.Models
{
    public class UserLikedProject
    {
        [Key]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }
}
