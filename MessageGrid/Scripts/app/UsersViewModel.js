function UsersViewModel() {
    var self = this;    
    self.Users = ko.observableArray();
    self.UserCreated = function(user, changedBy) {
        self.Users.push(user);
        toastr.info(user.UserName() + ' - has been created by ' + changedBy + '.', 'User Created', options= {
            "debug": false,
            "positionClass": "toast-bottom-right",
            "onclick": null,
            "fadeIn": 300,
            "fadeOut": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000
        });
    };
    self.UserDeleted = function(username, changedBy) {
        self.Users.remove(function(item) {
            return item.UserName() === username;
        });
        
        toastr.info(username + ' - has been deleted by ' + changedBy + '.', 'User Created', options = {
            "debug": false,
            "positionClass": "toast-bottom-right",
            "onclick": null,
            "fadeIn": 300,
            "fadeOut": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000
        });
    };
    self.UsersLoaded = function (users) {
        $(users).each(function(i, usr) {
            self.Users.push(usr);
        });
    };
    
    amplify.subscribe(AppConstants().USER_NOTIFICATION_CHANNEL, function(note) {
        if (note.Change.ChangeType === 1) {
            var usr = note.Change.Data;
            var user = new User(usr.UserName, usr.FirstName, usr.LastName, usr.UserId);
            self.UserCreated(user,note.ChangedBy);
        }
        if (note.Change.ChangeType === 2) {
            self.UserDeleted(note.Change.Data,note.ChangedBy);
        }
        if (note.Change.ChangeType === 3) {
            self.UsersLoaded(note.Change.Data);
        }
    });
    return self;
}