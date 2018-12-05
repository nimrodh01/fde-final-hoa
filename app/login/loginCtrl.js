app.controller("loginCtrl", function ($scope) {
    
    $scope.email = "nimrod.haller@mail.com";
    $scope.pwd = "123";

    $scope.invalidLogin = false;

    $scope.login = function () {
        $scope.invalidLogin = false;

        user.login($scope.email, $scope.pwd).then(function () {
            // success login
            $location.path("/")
        }, function (error) {
            // failed login
            $scope.invalidLogin = true;
        })
    }


}); 