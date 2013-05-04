using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using Nancy;

namespace MessageGrid.Api
{
    public class BaseApi:NancyModule
    {
        public BaseApi() : base("/api")
        {
        }

        protected string ReadBody()
        {
            string output;
            using (var reader = new StreamReader(Context.Request.Body))
            {
                output = reader.ReadToEnd();
            }

            return output;
        }
    }
}