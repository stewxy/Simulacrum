using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Simulacrum.Api.Models;

namespace Simulacrum.Api.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserAssignedProject>()
                .HasKey(ap => new { ap.UserId, ap.ProjectId });
            builder.Entity<UserAssignedProject>()
                .HasOne(ap => ap.Project)
                .WithMany(ap => ap.AssignedUsers)
                .HasForeignKey(ap => ap.ProjectId);
            builder.Entity<UserAssignedProject>()
                .HasOne(ap => ap.User)
                .WithMany(ap => ap.AssignedProjects)
                .HasForeignKey(ap => ap.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<UserLikedProject>()
                .HasKey(lp => new { lp.UserId, lp.ProjectId });
            builder.Entity<UserLikedProject>()
                .HasOne(lp => lp.Project)
                .WithMany(lp => lp.LikesFromUsers)
                .HasForeignKey(lp => lp.ProjectId);
            builder.Entity<UserLikedProject>()
                .HasOne(lp => lp.User)
                .WithMany(lp => lp.LikedProjects)
                .HasForeignKey(lp => lp.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ProjectSkill>()
                .HasKey(ps => new { ps.SkillId, ps.ProjectId });
            builder.Entity<ProjectSkill>()
                .HasOne(ps => ps.Skill)
                .WithMany(ps => ps.Projects)
                .HasForeignKey(ps => ps.SkillId);
            builder.Entity<ProjectSkill>()
                .HasOne(ps => ps.Project)
                .WithMany(ps => ps.RequiredSkills)
                .HasForeignKey(ps => ps.ProjectId);
        }

        public DbSet<Skill> Skills { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<UserLikedProject> UserLikedProjects{ get; set; }
        public DbSet<UserAssignedProject> UserAssignedProjects { get; set; }
        public DbSet<ProjectSkill> ProjectSkills { get; set; }
    }
}
