﻿$(document).ready(function () {
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