app.controller("loginCtrl", function ($scope, $location, user) {
    
    $scope.email = "nimrod.haller@gmail.com";
    $scope.pwd = "123";

    $scope.invalidLogin = false;

    $scope.login = function () {
        $scope.invalidLogin = false;

        user.login($scope.email, $scope.pwd).then(function () {
            // success login at this point directed to a sample page
            $location.path("/")
        }, function (error) {
            // failed login
            $scope.invalidLogin = true;
        })
    }


}); 