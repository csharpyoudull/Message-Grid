function UserRepository() {
    var self = this;
    self.CreateUser = function (username, firstname, lastname) {
        //in real life i would be a POST
        var user = new User(username, firstname, lastname);
        //end

        //this code would be executed on success
        amplify.publish('UserCreated', user);
        //end
    };
    return self;
};