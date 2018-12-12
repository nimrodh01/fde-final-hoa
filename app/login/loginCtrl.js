app.controller("loginCtrl", function ($scope, $location, user) {
    
    $scope.email = "nimrod.haller@gmail.com";
    $scope.pwd = "123";

    $scope.invalidLogin = false;

    $scope.login = function () {
        $scope.invalidLogin = false;

        user.login($scope.email, $scope.pwd).then(function () {
            $('#loginModal').modal('hide');
            $location.path("/")
        }, function (error) {
            $scope.invalidLogin = true;
        })
    }


}); 