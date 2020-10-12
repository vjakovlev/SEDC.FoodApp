using SEDC.FoodApp.Mailer.Models;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace SEDC.FoodApp.Mailer
{
    public static class SendMail
    {
        public static void Execute(Email email)
        {
            string to = email.To;
            string subject = email.Subject;
            string body = email.Body;

            MailMessage message = new MailMessage();

            message.To.Add(to);
            message.Subject = subject;
            message.Body = body;

            message.From = new MailAddress("sedcfoodapp@gmail.com");
            message.IsBodyHtml = false;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587;
            smtp.UseDefaultCredentials = true;
            smtp.EnableSsl = true;
            smtp.Credentials = new System.Net.NetworkCredential("sedcfoodapp@gmail.com", "sedcapp123");

            smtp.Send(message);

            Console.WriteLine("Message Sent");

            //https://myaccount.google.com/u/0/lesssecureapps
            //sedcfoodapp@gmail.com
            //sedcapp123
        }
    }
}

