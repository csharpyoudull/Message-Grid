function UsersViewModel() {
    var self = this;    
    self.Users = ko.observableArray();
    self.UserCreated = function(data) {
        self.Users.push(data);
    };
    amplify.subscribe('UserCreated', function(data) {
        self.UserCreated(data);
    });
    return self;
}