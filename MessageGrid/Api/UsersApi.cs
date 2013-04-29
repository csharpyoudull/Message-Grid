using System;
using System.IO;
using MessageGrid.Models;
using Nancy;
using Nancy.Responses;
using Newtonsoft.Json;

namespace MessageGrid.api
{
    public class UsersApi:NancyModule
    {
        public UsersApi() : base("/api")
        {
            Post["/users/user.json"] = CreateUser;
        }

        private Response CreateUser(dynamic pars)
        {
            TextResponse response;
            using (var reader = new StreamReader(Request.Body))
            {
                var user = JsonConvert.DeserializeObject<User>(reader.ReadToEnd());
                try
                {
                    var result = UserRepository.CreateUser(user);
                    return new TextResponse(HttpStatusCode.Accepted, result.ToString());
                }
                catch (Exception ex)
                {
                    response = new TextResponse(HttpStatusCode.Conflict,ex.Message);
                }
            }

            return response;
        }
    }
}