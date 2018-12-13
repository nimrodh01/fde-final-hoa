app.controller("loginCtrl", function ($scope, $location, communities, user) {

    // $scope.email = "nimrod.haller@gmail.com";
    // $scope.pwd = "123";

    $scope.invalidLogin = false;

    $scope.login = function () {
        $scope.invalidLogin = false;

        user.login($scope.email, $scope.pwd).then(function () {
            $('#loginModal').modal('hide');
            $scope.communityNameById();
            $location.path("/")
        }, function (error) {
            $scope.invalidLogin = true;
        })
    }

    $scope.communities = [];
    $scope.getCommunities = function () {
        communities.getAllCommunities().then(function (communities) {
            $scope.communities = communities
        })

    }

    // $scope.communityName = "Community";
    $scope.communityNameById = function () {
        if ($scope.isUserLoggedIn()) {
            var communityId = user.getActiveUser().communityId;
            $scope.communityName = communities.getCommunityNameById(communityId);
        }
    }






    // Remember Me
    //     if ($scope.rememberMe && $scope.email && $scope.pwd)
    //     {
    //     $scope.email = $scope.email;
    //     $scope.pwd = $scope.pwd;
    //     $scope.login
    // }



}); 

