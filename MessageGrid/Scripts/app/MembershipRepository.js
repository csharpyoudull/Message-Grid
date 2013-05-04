function MembershipRepository() {
    var self = this;
    self.Login = function(user) {
        $.ajax({
            type: 'POST',
            url: '/api/membership/login.json',
            contentType: 'application/json',
            data: ko.toJSON(user),
            statusCode: {
                404: function (xhr) {
                    alert('Invalid user name or password, please try again.');
                }
            }
        }).success(function (data) {
            amplify.publish(AppConstants().APP_AUTHENTICATION_CHANNEL,true);
        });
    };
    return self;
}
