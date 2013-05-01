function CreateUserViewModel() {
    var self = this;
    self.UserModel = new User('','','');
    self.CreateUser = function () {
        var repo = new UserRepository();
        repo.CreateUser(self.UserModel.Username(), self.UserModel.FirstName(), self.UserModel.LastName());
        self.UserModel.Username('');
        self.UserModel.FirstName('');
        self.UserModel.LastName('');
    };
    return self;
}
