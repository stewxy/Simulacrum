
using Microsoft.Extensions.DependencyInjection;
using Simulacrum.Api.Services.Implementations;
using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Tests
{
    [TestClass]
    public class TextFilterServiceTests : IntegrationTest
    {
        [TestMethod]
        public void TestTextCleanse()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var service = _serviceProvider.GetRequiredService<ITextFilterService>();
                string testString1 = "               remove white space.";
                string testString2 = "remove white space.                 ";
                string testString3 = "               remove white space.               ";

                Assert.IsTrue(service.TextCleanse(testString1).Equals("remove white space."));
                Assert.IsTrue(service.TextCleanse(testString2).Equals("remove white space."));
                Assert.IsTrue(service.TextCleanse(testString3).Equals("remove white space."));

                Assert.IsFalse(service.TextCleanse(testString1).Equals("               remove white space."));
            }

        }

        [TestMethod]
        public void TestProfanityCheck()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var service = _serviceProvider.GetRequiredService<ITextFilterService>();
                Assert.IsTrue(service.ContainsProfanity("5hit"));
                Assert.IsTrue(service.ContainsProfanity("your project is dog shit"));
                Assert.IsTrue(service.ContainsProfanity("    thanks   arsehole"));
                Assert.IsTrue(service.ContainsProfanity("    ASSHOLE"));
                Assert.IsTrue(service.ContainsProfanity("   you're welcome aSSHOLE             "));
                Assert.IsTrue(service.ContainsProfanity("fuck you"));
                Assert.IsTrue(service.ContainsProfanity("stop being a BITCH"));

                Assert.IsFalse(service.ContainsProfanity("Hi"));
                Assert.IsFalse(service.ContainsProfanity("    You are amazing"));
            }
        }


    }
}
