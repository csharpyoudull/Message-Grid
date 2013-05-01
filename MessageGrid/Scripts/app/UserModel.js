function User(username, firstname, lastname, userId) {
    var self = this;
    self.UserId = ko.observable(userId);
    self.Username = ko.observable(username);
    self.FirstName = ko.observable(firstname);
    self.LastName = ko.observable(lastname);
    self.Delete = function () {
        var repo = new UserRepository();
        repo.DeleteUser(self.UserId());
    };
    return self;
}