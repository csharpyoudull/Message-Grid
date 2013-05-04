using System.Collections.Generic;
using Nancy.Security;
using Newtonsoft.Json;

namespace MessageGrid.Models
{
    public class User:IUserIdentity 
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        [JsonIgnore]
        public System.Collections.Generic.IEnumerable<string> Claims
        {
            get { return new List<string>(); }
        }

    }
}