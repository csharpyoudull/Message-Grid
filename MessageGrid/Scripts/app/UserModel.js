function User(username, firstname, lastname, userId, password) {
    var self = this;
    self.UserId = ko.observable(userId);
    self.UserName = ko.observable(username);
    self.FirstName = ko.observable(firstname);
    self.LastName = ko.observable(lastname);
    self.Password = ko.observable(password);
    self.Delete = function () {
        var repo = new UserRepository();
        repo.DeleteUser(self.UserId());
    };
    return self;
}