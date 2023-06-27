using Simulacrum.Api.Models;

namespace Simulacrum.Api.DTOs.Domain
{
    public class ApplicationUserDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Id { get; set; }
        public string? ProfilePictureURL { get; set; }

        public ApplicationUserDTO(ApplicationUser user)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Username = user.UserName;
            Id = user.Id;
            if (user.ProfilePicFileName != null)
                ProfilePictureURL = $"{Constants.STORAGE_URL}/{user.Id}/{user.ProfilePicFileName}";
        }
    }
}