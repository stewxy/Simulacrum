using Simulacrum.Api.Models;

namespace Simulacrum.Api.Services.Interfaces
{
    public interface IStorageService
    {
        Task UploadProfilePicture(ApplicationUser user, IFormFile formFile);
        Task<string> GetProfilePictureUrl(ApplicationUser user);
    }
}
