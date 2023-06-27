using Simulacrum.Api.Data;
using Simulacrum.Api.Models;
using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Api.Services.Implementations
{
    public class MatchingService : IMatchingService
    {
        private readonly IAppRepo _appRepo;

        public MatchingService(IAppRepo appRepo)
        {
            _appRepo = appRepo;
        }

        public ICollection<Project> GetUserMatchedProjects(ApplicationUser user)
        {
            List<Project> matchedProjects = new List<Project>();
            List<Project> projects = _appRepo.GetAllProjects().ToList();
            var tupleList = new List<Tuple<float, Project>>();
            foreach (Project project in projects)
            {
                float project_weight = 0;
                if (project.Lead == user)
                {
                    continue;
                }
                IList<Skill> userSkills = _appRepo.GetUserSkills(user).ToList();
                List<Skill> projectSkills = new List<Skill>();
                foreach (var s in project.RequiredSkills)
                {
                    if (userSkills.Contains(s.Skill))
                    {
                        if (s.Weight == null)
                        {
                            continue;
                        }
                        project_weight += (float)s.Weight;

                    }
                }
                if (project_weight > 0)
                {
                    tupleList.Add(Tuple.Create(project_weight, project));
                }
            }
            if (tupleList.Count == 0)
            {
                List<Project> featuredProjects = _appRepo.GetFeaturedProjects().ToList();
                foreach (Project p in featuredProjects)
                {
                    matchedProjects.Add(p);
                }
            }
            else
            {
                foreach (var p in tupleList.OrderBy(x => x.Item1).ToList())
                {
                    matchedProjects.Add(p.Item2);
                }
            }

            return matchedProjects;
        }
    }
}
