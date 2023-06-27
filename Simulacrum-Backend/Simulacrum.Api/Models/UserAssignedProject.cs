namespace Simulacrum.Api.Models
{
    public class UserAssignedProject
    {
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
        public string? Status { get; set; }
    }
}
