app.controller("userCtrl", function ($scope, $location, user) {

    $scope.users = [];
    $scope.getMyUsers = function () {
        // $scope.communityMessages=[];
        user.getCommunityUsers().then(function (a) {
            $scope.users = a;
        }, function (error) {

        })
    }

    $scope.isUserCM = function () {
        return user.isCommitteeMember()
    }
    
    $scope.removeUser = function (usertoRemove) {
        // clear the fields of new message form
        $scope.users = user.removeUserFromCommunity(usertoRemove);
    };


    $scope.createUser = function () {
        user.createUser(newUserFirstName, newUserLastName,
            newUseremail,newUserPassword,newUserisCM).then(function (a) {
                $scope.users = a;
                $location.path("/tenents")
            }, function (err) {
                console.log(err);
            })
    }
}); 