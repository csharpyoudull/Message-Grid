using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using MessageGrid.Models;
using Nancy;
using Newtonsoft.Json;

namespace MessageGrid.Api
{
    public class MembershipApi:BaseApi
    {
        public MembershipApi()
        {
            Post["/membership/login.json"] = Login;
        }

        private Response Login(dynamic pars)
        {
            try
            {
                var body = ReadBody();
                if (string.IsNullOrEmpty(body))
                    return new Response {StatusCode = HttpStatusCode.BadRequest};

                var user = JsonConvert.DeserializeObject<User>(body);
                if (user == null)
                    return new Response { StatusCode = HttpStatusCode.BadRequest };

                var found =
                    UserRepository.GetUsers()
                                  .Any(
                                      u =>
                                      u.UserName.Equals(user.UserName, StringComparison.OrdinalIgnoreCase) &&
                                      u.Password.Equals(user.Password));
                
                if (found)
                {
                    var ticket = new FormsAuthenticationTicket(1, user.UserName, DateTime.Now,
                                                               DateTime.Now.Add(new TimeSpan(0, 0, 20, 0)), false, null);
                    var encryptedTicket = FormsAuthentication.Encrypt(ticket);

                    var cookie = FormsAuthentication.GetAuthCookie(user.UserName, false);
                    cookie.Value = encryptedTicket;
                }

                return found
                        ? new Response {StatusCode = HttpStatusCode.Accepted}
                        : new Response {StatusCode = HttpStatusCode.NotFound};
            }
            catch (Exception ex)
            {
                //for this demo I am not performing exception handling.
                return new Response
                           {
                               StatusCode = HttpStatusCode.InternalServerError
                           };
            }
        }
    }
}