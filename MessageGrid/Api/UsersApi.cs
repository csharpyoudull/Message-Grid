using System;
using System.IO;
using MessageGrid.Api;
using MessageGrid.Models;
using Nancy;
using Nancy.Responses;
using Newtonsoft.Json;

namespace MessageGrid.api
{
    public class UsersApi:SecureBaseApi 
    {
        public UsersApi()
        {
            Get["/users/users.json"] = GetUsers;

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
                    var result = UserRepository.CreateUser(user,CurrentUser.UserName);
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
                var result = UserRepository.DeleteUser(pars.id,CurrentUser.UserName);
                return result ? new TextResponse(HttpStatusCode.Accepted,"User deleted.") : new TextResponse(HttpStatusCode.NotFound,"User not found.");
            }
            catch
            {
                return new TextResponse(HttpStatusCode.InternalServerError,"Error attempting to delete user.");
            }
        }

        private Response GetUsers(dynamic pars)
        {
            try
            {
                return JsonConvert.SerializeObject(UserRepository.GetUsers());
            }
            catch (Exception)
            {
                return new TextResponse(HttpStatusCode.InternalServerError, "Error attempting to get users.");
            }
        }
    }
}