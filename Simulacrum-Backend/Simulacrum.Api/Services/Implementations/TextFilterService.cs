using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Api.Services.Implementations
{
    public class TextFilterService : ITextFilterService
    {
        public string TextCleanse(string text)
        {
            return text.Trim();
        }

        public bool ContainsProfanity(string text)
        {
            var filter = new ProfanityFilter.ProfanityFilter();
            return filter.DetectAllProfanities(TextCleanse(text)).Count > 0 ? true : false;
        }
    }
}
