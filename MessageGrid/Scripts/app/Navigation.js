function Navigation() {
    var self = this;
    self.LoginView = null;
    self.UsersView = null;
    self.CreateView = null;
    self.ShowLogin = function() {
        $('.view').hide();
        if (self.LoginView == null) {
            self.LoginView = new LoginViewModel();
            ko.applyBindings(self.LoginView, document.getElementById('loginView'));
        }
        $('#loginView').show();
        amplify.publish(AppConstants().APP_NAVIGATION_CHANNEL, AppConstants().APP_NAVIGATION_LOGIN);
    };
    self.ShowUsers = function() {
        $('.view').hide();
        
        if (self.UsersView == null) {
            self.CreateView = new CreateUserViewModel();
            self.UsersView = new UsersViewModel();
            ko.applyBindings(self.UsersView, document.getElementById('usersGrid'));
            ko.applyBindings(self.CreateView, document.getElementById('createView'));
            
            //get existing users and begin waiting for changes to user collection.
            var repo = new UserRepository();
            repo.GetUsers();
            repo.ListenForChanges();
        }
        
        $('#usersView').show();
        amplify.publish(AppConstants().APP_NAVIGATION_CHANNEL, AppConstants().APP_NAVIGATION_USERS);
    };

    self.Routing = Sammy('#content', function () {
        this.get('#/login', function () {
            self.ShowLogin();
        });
        this.get('#/users', function () {
            if (!self.Routing.IsAuthenticated) {
                window.location = '#/login';
                return;
            }
            self.ShowUsers();
        });
    });

    return self;
}