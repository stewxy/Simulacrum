using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Simulacrum.Api.Data;
using Simulacrum.Api.DTOs.Requests;
using Simulacrum.Api.DTOs.Responses;
using Simulacrum.Api.Models;
using Simulacrum.Api.Services.Interfaces;
using System.Security.Claims;

namespace Simulacrum.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SandboxController : SimulacrumController
    {
        private readonly ITestService _testService;

        public SandboxController(ITestService testService, IAppRepo appRepo) : base(appRepo)
        {
            _testService = testService;
        }

        // Test endpoint to demonstrate protected endpoints and how to retrieve the user
        // in such endpoints.
        [Authorize]
        [HttpGet("TestAuth")]
        public async Task<IActionResult> TestAuth()
        {
            // The uppercase 'User' refers to the HTTP request context - doesn't
            // represent an actual user object!
            var user = await  GetLoggedInUser();
            return Ok(new { status = "ok", email = user.Email, output = _testService.GetScore() });
        }

        // Test endpoint to demonstrate GET API requests on the frontend
        [HttpGet("TestFEGET")]
        public TestGETResponseDTO TestFEGET()
        {
            return new TestGETResponseDTO()
                {
                    Number = 69,
                    Text = "Some random text",
                    Numbers = new int[] { 1, 2, 3, 4, 5, 6, 7 }
                };
        }

        // Test endpoint to demonstrate POST API requests on the frontend
        [HttpPost("TestFEPOST")]
        public TestPOSTResponseDTO TestFEPOST([FromBody] TestPOSTRequestDTO testPostRequestDTO)
        {
            return new TestPOSTResponseDTO()
            {
                Message = $"Hello, {testPostRequestDTO.Name!}"
            };
        }

        // Mock endpoint for frontend devs for learning purposes
        [HttpGet("MockProjectDetails")]
        public MockProjectDetailsResponseDTO MockProjectDetails()
        {
            return new MockProjectDetailsResponseDTO()
            {
                Id = 69,
                Name = "Mock project",
                Description = "This is a mock project",
                ImageURL = "https://static.wikia.nocookie.net/meme/images/0/07/Amogus_Template.png/",
                Tags = new string[] { "c#", ".net", "react", "sql", "css", "ui", "ux", "sus" }
            };
        }

        [Authorize]
        [AllowAnonymous]
        [HttpGet("OptionalAuth")]
        public IActionResult OptionalAuth()
        {
            return Ok(new { signedIn = IsLoggedIn() });
        }
    }
}
