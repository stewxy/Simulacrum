using Simulacrum.Api.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Azure.Communication.Email;
using Azure.Communication.Email.Models;
using System.Configuration;
namespace Simulacrum.Api.Services.Implementations
{
    public class EmailNotificationService : IEmailNotificationService
    {
        private readonly IConfiguration _config;
        private string connectionString, simulacrumEmail;
        private EmailClient emailClient;

        public EmailNotificationService(IConfiguration config)
        {
            _config = config;
            connectionString = _config.GetConnectionString("AzureCommunication");
            simulacrumEmail = _config["sender"];
            emailClient = new EmailClient(connectionString);

        }

        public void NotifyEmail(string email, string subject, string messagebody)
        {
            EmailContent emailContent = new EmailContent(subject);
            emailContent.PlainText = messagebody;
            List<EmailAddress> emailAddresses = new List<EmailAddress> { new EmailAddress(email) {} };
            EmailRecipients emailRecipients = new EmailRecipients(emailAddresses);
            EmailMessage emailMessage = new EmailMessage(simulacrumEmail, emailContent, emailRecipients);
            SendEmailResult emailResult = emailClient.Send(emailMessage, CancellationToken.None);
        }
    }
}
