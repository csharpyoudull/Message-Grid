function UsersViewModel() {
    var self = this;    
    self.Users = ko.observableArray();
    self.UserCreated = function(user) {
        self.Users.push(user);
    };
    self.UserDeleted = function(userId) {
        self.Users.remove(function(item) {
            return item.UserId() === userId;
        });
    };
    self.UsersLoaded = function (users) {
        $(users).each(function(i, usr) {
            self.Users.push(usr);
        });
    };
    
    amplify.subscribe(AppConstants().USER_CREATED_CHANNEL, function(user) {
        self.UserCreated(user);
    });
    amplify.subscribe(AppConstants().USER_DELETED_CHANNEL, function (userId) {
        self.UserDeleted(userId);
    });
    amplify.subscribe(AppConstants().USERS_LOADED_CHANNEL, function (users) {
        self.UsersLoaded(users);
    });
    return self;
}