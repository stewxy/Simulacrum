namespace Simulacrum.Api.Services.Interfaces
{
    public interface ITagFilterService
    {
        ICollection<string> TagCleanse(ICollection<string> text);
        bool TagContainsProfanity(ICollection<string> text);
    }
}
