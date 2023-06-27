namespace Simulacrum.Api.Services.Interfaces
{
    public interface ITextFilterService
    {
        string TextCleanse(string text);
        bool ContainsProfanity(string text);
    }
}
