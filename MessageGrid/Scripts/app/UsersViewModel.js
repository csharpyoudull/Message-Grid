function UsersViewModel() {
    var self = this;    
    self.Users = ko.observableArray();
    self.UserCreated = function(user) {
        self.Users.push(user);
    };
    self.UserDeleted = function(userId) {
        self.Users.remove(function(item) {
            return item.Id() === userId;
        });
    };
    amplify.subscribe(AppConstants().USER_CREATED_CHANNEL, function(user) {
        self.UserCreated(user);
    });
    amplify.subscribe(AppConstants().USER_DELETED_CHANNEL, function (userId) {
        self.UserDeleted(userId);
    });
    return self;
}