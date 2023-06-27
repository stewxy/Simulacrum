using Microsoft.AspNetCore.Mvc.Testing;
using System.Diagnostics;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Simulacrum.Api.Data;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http.Json;
using Simulacrum.Api.DTOs.Responses;

namespace Simulacrum.Tests
{
    [TestClass]
    public class SandboxAPITests : IntegrationTest
    {
        [TestMethod]
        public async Task MockRoute_ReturnsValidResponse()
        {
            var res = await _httpClient.GetAsync("api/Sandbox/MockProjectDetails");
            string result = await res.Content.ReadAsStringAsync();
            Assert.IsTrue(result.Contains("69"));
        }

        [TestMethod]
        public async Task TestAuth_ReturnsValidResponse()
        {
            await AuthenticateAsync();
            var res = await _httpClient.GetAsync("api/Sandbox/TestAuth");
            string result = await res.Content.ReadAsStringAsync();
            Assert.IsTrue(result.Contains("some_email2@yahoo.com"));
        }

        [TestMethod]
        public async Task TestFEGET_ReturnsValidResponse()
        {
            var res = await _httpClient.GetAsync("api/Sandbox/TestFEGET");
            string result = await res.Content.ReadAsStringAsync();
            Assert.IsTrue(result.Contains("Some random text"));
        }

        [TestMethod]
        public async Task TestFEPOST_ReturnsValidResponse()
        {
            var res = await _httpClient.PostAsJsonAsync("api/Sandbox/TestFEPOST", new
            {
                name = "Mark"
            });
            var response = await res.Content.ReadAsAsync<TestPOSTResponseDTO>();
            Assert.IsTrue(response.Message.Contains("Hello, Mark"));
        }
    }
}