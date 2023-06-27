using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Simulacrum.Api.Data;
using Simulacrum.Api.Models;
using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Api.Services.Implementations
{
    public class AzureStorageService : IStorageService
    {
        private readonly IConfiguration _config;
        private readonly BlobServiceClient _blobServiceClient;
        private readonly IAppRepo _appRepo;

        public AzureStorageService(IConfiguration config, IAppRepo appRepo)
        {
            _config = config;
            _blobServiceClient = new BlobServiceClient(_config.GetConnectionString("AzureStorage"));
            _appRepo = appRepo;
        }

        public Task<string> GetProfilePictureUrl(ApplicationUser user)
        {
            return user.ProfilePicFileName == null ? Task.FromResult("") :
                Task.FromResult($"{_config["AzureStorageURL"]}/{user.Id}/{user.ProfilePicFileName}");
        }

        public async Task UploadProfilePicture(ApplicationUser user, IFormFile formFile)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(user.Id);
            if (!await containerClient.ExistsAsync())
            {
                // Create the "container" (folder) that stores the user's profile picture
                await _blobServiceClient.CreateBlobContainerAsync(user.Id, PublicAccessType.Blob);
                containerClient = _blobServiceClient.GetBlobContainerClient(user.Id);
            }
            else
            {
                // Delete old profile picture
                await containerClient.GetBlobClient(user.ProfilePicFileName).DeleteAsync();
            }

            string[] fileNameSplit = formFile.FileName.Split('.');
            string newFileName = $"profile-{Guid.NewGuid()}.{fileNameSplit[1]}";
            await _appRepo.UpdateProfilePicFileName(user, newFileName);
            await containerClient.UploadBlobAsync(newFileName, formFile.OpenReadStream());
        }
    }
}
