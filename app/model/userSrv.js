app.factory("user", function ($q, $http) {

    var activeUser = null;
    // new User( {
    //     "id": 1,
    //     "fname": "Nir",
    //     "lname": "Channes",
    //     "email": "nir@nir.com",
    //     "pwd": "123"
    // });

    function User(plainUser) {
        this.id = plainUser.id;
        this.fname = plainUser.fname;
        this.lname = plainUser.lname;
        this.email = plainUser.email;
        this.pwd = plainUser.pwd;
        this.community = plainUser.community;
        this.unit = plainUser.unit;
        this.isCM = plainUser.isCM;
    }

    function login(email, pwd) {
        var async = $q.defer();

        // var loginURL = "http://my-json-server.typicode.com/nimrodh01/fed-final-hoa/users?email=" +
        //     email + "&pwd=" + pwd;
        // $http.get(loginURL).then(function(response) {
        // if (response.data.length > 0) {
        //     // success login
        //     activeUser = new User(response.data[0]);
        //     async.resolve(activeUser);
        if (email === "nimrod.haller@gmail.com" && pwd === "123") {
            // success login
            activeUser = new User({
                id: "1", fname: "Nir", lname: "Channes",
                email: "nir@nir.com", pwd: "123"
            });
            async.resolve(activeUser);

        } else {
            // invalid email or password
            async.reject("invalid email or password");
        }
        // }, function(error) {
        // async.reject(error);
        // });

        return async.promise;
    }


    function isLoggedIn() {
        return activeUser ? true : false;
    }

    function logout() {
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser
    }
})