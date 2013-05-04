$(document).ready(function () {
    //for the purposes of this demo i'm executing these calls at application start
    //for a real world application you would obviously want to wait until after authentication was successful
    //var repo = new UserRepository();
    //repo.GetUsers();
    //repo.ListenForChanges();

    //start application navigation
    var nav = Navigation();
    nav.Routing.run('#/login');

    //subscribe to the authentication channel, once a authenticated add #/users view.
    amplify.subscribe(AppConstants().APP_AUTHENTICATION_CHANNEL, function (authenticated) {
        nav.Routing.IsAuthenticated = authenticated;
        if (authenticated) {
            window.location = '#/users';
        }
    });

});