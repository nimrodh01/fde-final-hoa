app.factory("user", function ($q, $http, $location) {
    var users = {};
    var activeUser = null;
    // new User( {
    //     "id": 1,
    //     "fname": "Nir",
    //     "lname": "Channes",
    //     "email": "nir@nir.com",
    //     "pwd": "123"
    // });

    function User(plainUser) {
        this.userId = plainUser.userId;
        this.fname = plainUser.fname;
        this.lname = plainUser.lname;
        this.email = plainUser.email;
        this.pwd = plainUser.pwd;
        this.communityId = plainUser.communityId;
        this.unit = plainUser.unit;
        this.isCM = plainUser.isCM;
        this.isAdm = plainUser.isAdm
    }
    User.prototype.fullName = function () {
        return this.fname + " " + this.lname;
    }

    function login(email, pwd) {
        var async = $q.defer();
        var loginURL = "http://my-json-server.typicode.com/nimrodh01/fed-final-hoa/users?email=" +
            email + "&pwd=" + pwd;
        $http.get(loginURL).then(function (response) {
            if (response.data.length > 0) {
                // success login
                activeUser = new User(response.data[0]);
                async.resolve(activeUser);
            } else {
                // invalid email or password
                async.reject("invalid email or password");
            }
        }, function (error) {
            async.reject(error);
        });

        return async.promise;
    }


    function isLoggedIn() {
        return activeUser ? true : false;
    }


    function isCommitteeMember() {
        return activeUser.isCM;
    }


    function createUser(fname, lname, communityId, email, unit, isCM, isAdm) {
        var async = $q.defer();
        // var createdBy = user.getActiveUser().userId
        // var communityId = user.getActiveUser().communityId;
        var newUser = new User({ fname: fname, lname: lname, communityId: communityId, email: email, unit: unit, isCM: isCM, isAdm: isAdm });
        users[communityId].unshift(newUser);
        async.resolve(users[communityId]);
        return async.promise;
    }



    // function removeUser(user) {
    //     var communityId = user.getActiveUser().communityId;
    //     var index = messages[communityId].indexOf(message);
    //     messages[communityId].splice(index, 1);
    //     return messages[communityId]

    // }



    function logout() {
        activeUser = null;
        $location.path("/")
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser,
        isCommitteeMember: isCommitteeMember,
        createUser:createUser
    }
})