using System.ComponentModel.DataAnnotations;

namespace Simulacrum.Api.DTOs.Requests
{
    public class ProfilePictureUploadRequestDTO
    {
        [Required]
        public IFormFile ProfilePicture { get; set; }
    }
}
