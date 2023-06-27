using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Simulacrum.Api.Data;
using Simulacrum.Api.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Simulacrum.Tests
{
    [TestClass]
    public class DatabaseTests : IntegrationTest
    {
        [TestMethod]
        public async Task Projects_NoProjectsCreated()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var appRepo = scope.ServiceProvider.GetRequiredService<IAppRepo>();
                var projects = appRepo.GetAllProjects().ToList();
                Assert.IsTrue(projects.Count == 0);
            }
        }
    }
}
