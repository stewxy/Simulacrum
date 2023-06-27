using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Simulacrum.Api.Services.Implementations;
using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Tests
{
    [TestClass]
    public class TagFilterServiceTests : IntegrationTest
    {
        [TestMethod]
        public void TestTagCleanse()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var service = _serviceProvider.GetRequiredService<ITagFilterService>();
                List<string> test1 = new List<string>();
                test1.Add("A");
                test1.Add("a");
                test1.Add("a  ");
                test1.Add("   a");
                test1 = service.TagCleanse(test1).ToList();

                List<string> test2 = new List<string>();
                test2.Add("_A a_");
                test2.Add("_A a_   *&@@$^%*");
                test2.Add(" *(@@ $)^ @@%&*  _a a_ ,/.;] [ ");
                test2 = service.TagCleanse(test2).ToList();


                List<string> test3 = new List<string>();
                test3.Add("&^%@@) -_a 1 a_  %^&*@$");
                test3 = service.TagCleanse(test3).ToList();

                List<string> test4 = new List<string>();
                test4.Add("*(&^@!    -+#A_    %^$^*!@");
                test4 = service.TagCleanse(test4).ToList();


                foreach (string s in test1)
                {
                    Assert.IsTrue(s.Equals("a"));
                }

                foreach (string s in test2)
                {
                    Assert.IsTrue(s.Equals("-a-a-"));
                }

                foreach (string s in test3)
                {
                    Assert.IsTrue(s.Equals("--a-1-a-"));
                }

                foreach (string s in test4)
                {
                    Assert.IsTrue(s.Equals("-+#a-"));
                }
            }
        }

        [TestMethod]
        public void TestTagProfanityCheck()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var service = _serviceProvider.GetRequiredService<ITagFilterService>();
                List<string> test1 = new List<string>();
                test1.Add("shit   ");
                test1.Add("   arsehole");
                test1.Add("    bitch");
                test1.Add("fuck   ");

                Assert.IsTrue(service.TagContainsProfanity(test1));

                List<string> test2 = new List<string>();
                test2.Add("monke");
                test2.Add("   strong");
                test2.Add("    together");
                test2.Add("bing      chilling   ");
                Assert.IsFalse(service.TagContainsProfanity(test2));
            }
        }
    }
}
