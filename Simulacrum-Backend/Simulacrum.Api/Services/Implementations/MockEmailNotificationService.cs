using Simulacrum.Api.Services.Interfaces;
namespace Simulacrum.Api.Services.Implementations

{
    public class MockEmailNotificationService : IEmailNotificationService
    {
        public void NotifyEmail(string email, string subject, string messagebody)
        {

        }
    }
}
