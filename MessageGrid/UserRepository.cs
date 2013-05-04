using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using MessageGrid.Hubs;
using MessageGrid.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;
using Newtonsoft.Json;

namespace MessageGrid
{
    public static class UserRepository
    {
        private enum ChangeType
        {
            Create = 1,
            Delete = 2,
        }

        private static int _idCounter;

        private static List<User> Users { get; set; }

        private static IPersistentConnectionContext PersistentUserConnection { get; set; } 

        static UserRepository()
        {
            _idCounter = 1;

            //Create user colelction and add a default user
            Users = new List<User>
                        {
                            new User
                                {
                                    UserId = 1,
                                    UserName = "admin",
                                    Password = "admin",
                                    FirstName = "admin",
                                    LastName = "admin"
                                }
                        };
            

            PersistentUserConnection = GlobalHost.ConnectionManager.GetConnectionContext<UsersHub>();
        }

        public static int CreateUser(User user)
        {
            if (Users.Any(u => u.UserName.Equals(user.UserName, StringComparison.OrdinalIgnoreCase)))
            {
                throw new Exception("Username already in use, to clear user repository stop web server.");
            }

            user.UserId = GetId();
            Users.Add(user);
            PublishChanges(ChangeType.Create, user);
            return user.UserId;
        }

        public static bool DeleteUser(int userId)
        {
            var user = Users.FirstOrDefault(usr => usr.UserId.Equals(userId));
            if (user == null)
                return false;

            Users.Remove(user);
            PublishChanges(ChangeType.Delete, userId);
            return true;
        }

        public static List<User> GetUsers()
        {
            return Users;
        }

        private static int GetId()
        {
            return Interlocked.Increment(ref _idCounter);
        }

        private static void PublishChanges(ChangeType type, object change)
        {
            var notify = new {ChangeType = (int) type, Data = change};
            var json = JsonConvert.SerializeObject(notify);
            PersistentUserConnection.Connection.Broadcast(json);
        }
    }
}