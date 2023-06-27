using Simulacrum.Api.Data;
using Simulacrum.Api.Models;
using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Api.Services.Implementations
{
    public class MatchingServiceReborn : IMatchingService
    {
        private readonly IAppRepo _appRepo;

        public MatchingServiceReborn(IAppRepo appRepo)
        {
            _appRepo = appRepo;
        }

        public ICollection<Project> GetUserMatchedProjects(ApplicationUser user)
        {
            var matchedProjects = new List<Project>();
            var projects = _appRepo.GetAllProjects().ToList();
            var projectWeightList = new List<Tuple<float, Project>>();
            var userCreatedProjects = user.CreatedProjects.ToHashSet();
            var userJoinedProjects = user.AssignedProjects.Select(ap => ap.Project).ToHashSet();

            foreach (var project in projects)
            {
                if (project.Lead == user || userCreatedProjects.Contains(project) || userJoinedProjects.Contains(project))
                    continue;

                var skillWeight = new Dictionary<Skill, float>();
                float projectSkillWeight = 0.0f;
                project.RequiredSkills.ToList().ForEach(ps =>
                {
                    float weight = ps.Weight == null ? 0 : (float)ps.Weight;
                    skillWeight.Add(ps.Skill, weight);
                    projectSkillWeight += weight;
                });

                float threshold = 0.4f * projectSkillWeight;
                float userSkillWeight = 0.0f;

                _appRepo.GetUserSkills(user).ToList().ForEach((skill) =>
                {
                    if (skillWeight.ContainsKey(skill))
                        userSkillWeight += skillWeight[skill];
                });

                if (userSkillWeight >= threshold)
                {
                    projectWeightList.Add(Tuple.Create(userSkillWeight, project));
                }
                else if (project.AssignedUsers.Count == 1 && (projectSkillWeight - userSkillWeight) < (projectSkillWeight / project.RequiredSkills.Count))
                {
                    projectWeightList.Add(Tuple.Create(userSkillWeight, project));
                }
            }

            if (projectWeightList.Count == 0)
            {
                var featuredProjects = _appRepo.GetFeaturedProjects().ToHashSet();
                var filtered = featuredProjects.Except(userJoinedProjects.Union(userCreatedProjects));
                matchedProjects.AddRange(filtered);
            }
            else
            {
                foreach (var tuple in projectWeightList.OrderBy(x => x.Item1))
                {
                    matchedProjects.Add(tuple.Item2);
                }
            }

            return matchedProjects;
        }
    }
}
