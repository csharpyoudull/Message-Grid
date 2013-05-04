function LoginViewModel() {
    var self = this;
    self.UserModel = new User();
    self.Login = function () {
        var repo = new MembershipRepository();
        repo.Login(self.UserModel);
        self.UserModel.UserName('');
        self.UserModel.FirstName('');
        self.UserModel.LastName('');
        self.UserModel.Password('');
    };
    return self;
}
