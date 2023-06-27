using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Simulacrum.Api.DTOs.Requests;
using Simulacrum.Api.DTOs.Responses;
using Simulacrum.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailNotificationService _emailService;

        public AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration, IEmailNotificationService emailService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailService = emailService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                var token = GenerateToken(user);
                return Ok(new LoginResponseDTO()
                {
                    UserId = user.Id,
                    Token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            return Unauthorized();
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequest)
        {
            if (await _userManager.FindByEmailAsync(registerRequest.Email) != null || await _userManager.FindByNameAsync(registerRequest.Username) != null)
                return BadRequest();
            var user = new ApplicationUser()
            {
                Email = registerRequest.Email,
                UserName = registerRequest.Username,
                FirstName = registerRequest.FirstName,
                LastName = registerRequest.LastName
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);
            if (!result.Succeeded)
                return BadRequest();

            var token = GenerateToken(user);
            _emailService.NotifyEmail(user.Email, "Welcome to Simulacrum!", "You have successfully registered to Simulacrum");

            return Ok(new LoginResponseDTO()
            {
                UserId = user.Id,
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }

        private JwtSecurityToken GenerateToken(ApplicationUser user)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: new List<Claim>()
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("id", user.Id)
                },
                expires: DateTime.Now.AddDays(69),
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            );
            return token;
        }
    }
}
