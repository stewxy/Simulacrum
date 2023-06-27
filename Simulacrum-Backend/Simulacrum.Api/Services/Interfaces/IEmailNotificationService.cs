namespace Simulacrum.Api.Services.Interfaces
{
    public interface IEmailNotificationService
    {
        void NotifyEmail(string email, string subject, string  messagebody);
    }
}
