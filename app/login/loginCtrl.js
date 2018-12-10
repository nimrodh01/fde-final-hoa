app.controller("loginCtrl", function ($scope, $location, user) {
    
    $scope.email = "nimrod.haller@gmail.com";
    $scope.pwd = "123";

    $scope.invalidLogin = false;

    $scope.login = function () {
        $scope.invalidLogin = false;

        user.login($scope.email, $scope.pwd).then(function () {
            // success login at this point directed to a sample page
            // window.alert("u r logged in");
            $('#loginModal').modal('hide');
            $location.path("/")
        }, function (error) {
            // failed login
            // window.alert("failed to logged in");
            $scope.invalidLogin = true;
        })
    }


}); 