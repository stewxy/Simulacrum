using System.ComponentModel.DataAnnotations;

namespace Simulacrum.Api.DTOs.Requests
{
    public class TestPOSTRequestDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
