function AppConstants() {
    var self = this;
    //channels
    self.USER_CREATED_CHANNEL = 'user_created';
    self.USER_DELETED_CHANNEL = 'user_deleted';
    self.USERS_LOADED_CHANNEL = 'users_loaded';
    self.APP_NAVIGATION_CHANNEL = 'app_navigation';
    self.APP_AUTHENTICATION_CHANNEL = 'app_authentication';
    //navigation types
    self.APP_NAVIGATION_LOGIN = 'app_navigation_login';
    self.APP_NAVIGATION_USERS = 'app_navigation_users';
    return self;
}