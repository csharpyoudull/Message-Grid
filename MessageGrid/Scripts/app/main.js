$(document).ready(function () {
    ko.applyBindings(new UsersViewModel(), document.getElementById('usersView'));
    ko.applyBindings(new CreateUserViewModel(), document.getElementById('createView'));

    //get the users from the server, and begin listening for changes to the users.
    var repo = new UserRepository();
    repo.GetUsers();
    repo.ListenForChanges();
});