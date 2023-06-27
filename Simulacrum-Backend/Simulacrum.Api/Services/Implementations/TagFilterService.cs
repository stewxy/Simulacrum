using Simulacrum.Api.Services.Interfaces;
using System.Text.RegularExpressions;

namespace Simulacrum.Api.Services.Implementations
{
    public class TagFilterService : ITagFilterService
    {
        public ICollection<string> TagCleanse(ICollection<string> text)
        {
            List<string> newString = new List<string>();

            string temp;
            string result;

            Regex rgx = new Regex("[^a-zA-Z0-9-+# -]");
            foreach (string s in text)
            {
                result = s;
                result = result.ToLower();
                result = result.Replace("_", "-");
                result = rgx.Replace(result, "");
                result = result.Trim();
                result = result.Replace(" ", "-");
                newString.Add(result);
            }
            return newString;
        }

        public bool TagContainsProfanity(ICollection<string> text)
        {
            
            TextFilterService _service = new TextFilterService();

            foreach(string s in text)
            {
                if(_service.ContainsProfanity(s) == true)
                {
                    return true;
                }
            }
            return false;

        }
    }
}
