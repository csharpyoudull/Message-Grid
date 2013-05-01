function UserRepository() {
    var self = this;
    self.CreateUser = function (username, firstname, lastname) {
        var user = new User(username, firstname, lastname);
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
            user.Id(data);
            amplify.publish(AppConstants().USER_CREATED_CHANNEL, user);
        });
    };
    self.DeleteUser = function(userId) {
        $.ajax({
            type: 'DELETE',
            url: '/api/users/' + userId,
            contentType: 'application/json'
        }).success(function () {
            amplify.publish(AppConstants().USER_DELETED_CHANNEL, userId);
        }).fail(function() {
            alert("Run! There was an error attempting to delete the user.");
        });
    };
    return self;
};