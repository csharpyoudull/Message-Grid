﻿$(document).ready(function () {
    ko.applyBindings(new UsersViewModel(), document.getElementById('usersView'));
    ko.applyBindings(new CreateUserViewModel(), document.getElementById('createView'));

    var repo = new UserRepository();
    repo.GetUsers();
});