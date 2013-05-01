using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using MessageGrid.Models;

namespace MessageGrid
{
    public static class UserRepository
    {
        private static int _idCounter;

        private static List<User> Users { get; set; }

        static UserRepository()
        {
            _idCounter = 0;
            Users = new List<User>();
        }

        public static int CreateUser(User user)
        {
            if (Users.Any(u => u.Username.Equals(user.Username, StringComparison.OrdinalIgnoreCase)))
            {
                throw new Exception("Username already in use, to clear user repository stop web server.");
            }

            user.Id = GetId();
            Users.Add(user);
            return user.Id;
        }

        public static bool DeleteUser(int userId)
        {
            var user = Users.FirstOrDefault(usr => usr.Id.Equals(userId));
            if (user == null)
                return false;

            Users.Remove(user);
            return true;
        }

        private static int GetId()
        {
            return Interlocked.Increment(ref _idCounter);
        }
    }
}