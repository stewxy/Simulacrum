using Simulacrum.Api.Models;
using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Api.Services.Implementations
{
    public class MockStorageService : IStorageService
    {
        public Task<string> GetProfilePictureUrl(ApplicationUser user)
        {
            return Task.FromResult("https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg");
        }

        public Task UploadProfilePicture(ApplicationUser user, IFormFile formFile)
        {
            return Task.CompletedTask;
        }
    }
}
