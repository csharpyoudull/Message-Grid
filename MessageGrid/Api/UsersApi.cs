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

            Delete["/users/{id}"] = DeleteUser;
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

        private Response DeleteUser(dynamic pars)
        {
            try
            {
                var result = UserRepository.DeleteUser(pars.id);
                return result ? new TextResponse(HttpStatusCode.Accepted,"User deleted.") : new TextResponse(HttpStatusCode.NotFound,"User not found.");
            }
            catch
            {
                //you should really do something here but for this demo just returning a 500.
                return new TextResponse(HttpStatusCode.InternalServerError,"Error attempting to delete user.");
            }
        }
    }
}