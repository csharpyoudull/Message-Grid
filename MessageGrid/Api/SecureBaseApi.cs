using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Security;
using MessageGrid.Models;
using Nancy;

namespace MessageGrid.Api
{
    public class SecureBaseApi:BaseApi 
    {
        public User CurrentUser
        {
            get { return (User)Context.CurrentUser; }
        }

        public SecureBaseApi()
        {            
            Before += CheckAuthentication;
        }

        private Response CheckAuthentication(NancyContext ctx)
        {
            return IsAuthenticated() ? null : new Response(){StatusCode = HttpStatusCode.Unauthorized};
        }

        private bool IsAuthenticated()
        {
            if (!Context.Request.Cookies.ContainsKey(FormsAuthentication.FormsCookieName))
                return false;

            var encryptedTicket = Context.Request.Cookies[FormsAuthentication.FormsCookieName];
            var ticket = FormsAuthentication.Decrypt(encryptedTicket);
            var authenticated = ticket != null && !string.IsNullOrWhiteSpace(ticket.Name);
            if (authenticated)
                Context.CurrentUser = new User { UserName = ticket.Name };

            return authenticated;
        }
    }
}