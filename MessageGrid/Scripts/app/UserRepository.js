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
            amplify.publish('UserCreated', user);
        });
    };
    return self;
};