function UserRepository() {
    var self = this;
    self.CreateUser = function (user) {
        $.ajax({
            type: 'POST',
            url: '/api/users/user.json',
            contentType: 'application/json',
            data: ko.toJSON(user),
            statusCode: {
                409: function(xhr) {
                    alert(xhr.responseText);
                }
            }
        }).success(function (data) {
            //possibly hide loading icons, data update will arrive from signal.
            //data field contains user id, if reqired for other functions.
        });
    };
    self.DeleteUser = function (userId) {
        $.ajax({
            type: 'DELETE',
            url: '/api/users/' + userId,
            contentType: 'application/json'
        }).success(function () {
            //possibly hide loading icons, data update will arrive from signal.
        }).fail(function() {
            alert("Run! There was an error attempting to delete the user.");
        });
    };
    self.GetUsers = function() {
        $.getJSON('/api/users/users.json').success(function (data) {
            var users = [];
            $(data).each(function (i, usr) {
                users.push(new User(usr.UserName, usr.FirstName, usr.LastName, usr.UserId));
            });
            amplify.publish(AppConstants().USERS_LOADED_CHANNEL, users);
        }).fail(function() {
            alert("There was an error loading users.");
        });
    };
    self.ListenForChanges = function() {
        var con = $.connection('/userhub');
        con.received(function(data) {
            self.ProcessChanges(data);
        });
        
        con.start();
    };
    self.ProcessChanges = function (data) {
        var change = $.parseJSON(data);
        switch (change.ChangeType) {
            case 1:
                var user = new User(change.Data.UserName, change.Data.FirstName, change.Data.LastName, change.Data.UserId);
                amplify.publish(AppConstants().USER_CREATED_CHANNEL, user);
                break;
            case 2:
                amplify.publish(AppConstants().USER_DELETED_CHANNEL, change.Data);
                break;
        }
    };
    return self;
};