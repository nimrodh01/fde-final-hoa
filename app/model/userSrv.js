app.factory("user", function ($q, $http, $location) {

    var users = {};
    var activeUser = null;
    var wasEverLoaded = {};

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
    };


    function getCommunityUsers() {
        var async = $q.defer();
        var communityId = activeUser.communityId;


        if (wasEverLoaded[communityId]) {
            async.resolve(users[communityId]);
        } else {
            users[communityId] = [];
            var getUsersURL = "http://my-json-server.typicode.com/nimrodh01/fed-final-hoa/users?communityId=" + communityId;

            $http.get(getUsersURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var user = new User(response.data[i]);
                    users[communityId].push(user);
                }
                wasEverLoaded[communityId] = true;
                async.resolve(users[communityId]);
            }, function (error) {
                async.reject(error);
            });
            return async.promise;
        };
    }

    function removeUserFromCommunity(user) 
    {
        var communityId = user.communityId;
        var index = users[communityId].indexOf(user);
        users[communityId].splice(index, 1);
        return users[communityId];
    }


    function logout() {
        activeUser = null;
        // $location.path("/")
    };

    function getActiveUser() {
        return activeUser;
    };

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser,
        isCommitteeMember: isCommitteeMember,
        createUser: createUser,
        getCommunityUsers: getCommunityUsers,
        removeUserFromCommunity: removeUserFromCommunity
    }
})