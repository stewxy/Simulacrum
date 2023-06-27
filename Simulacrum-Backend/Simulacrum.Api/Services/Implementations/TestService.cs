using Simulacrum.Api.Services.Interfaces;

namespace Simulacrum.Api.Services.Implementations
{
    public class TestService : ITestService
    {
        public int GetScore()
        {
            return 69;
        }
    }
}
