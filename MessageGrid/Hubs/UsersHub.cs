using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;
using MessageGrid.Models;
using Microsoft.AspNet.SignalR;

namespace MessageGrid.Hubs
{
    public class UsersHub:PersistentConnection
    {
        protected override Task OnConnected(IRequest request, string connectionId)
        {
            return !IsAuthenticated(request) ? null : base.OnConnected(request, connectionId);
        }

        protected override Task OnReceived(IRequest request, string connectionId, string data)
        {
            return Connection.Broadcast(data);
        }

        private bool IsAuthenticated(IRequest request)
        {
            if (!request.Cookies.ContainsKey(FormsAuthentication.FormsCookieName))
                return false;

            var encryptedTicket = request.Cookies[FormsAuthentication.FormsCookieName];
            var ticket = FormsAuthentication.Decrypt(encryptedTicket.Value);
            var authenticated = ticket != null && !string.IsNullOrWhiteSpace(ticket.Name);
            
            return authenticated;
        }
    }
}