
app.controller("navbarCtrl", function ($scope, user, $location) {

    $scope.isUserLoggedIn = function () {
        return user.isLoggedIn();
    }

    $scope.logout = function () {
        user.logout();
        $location.path("/");
    }


    $scope.getfirstName = function () {
        if ($scope.isUserLoggedIn())
            return user.getActiveUser().fname;
    }



    $scope.getCommunity = function () {
        if ($scope.isUserLoggedIn())
            return user.getActiveUser().communityId
        else
            return "Community"
    }



    // $scope.getMessages = function(){
    //     if($scope.isUserLoggedIn())
    //     return messages.getCommunityMessages();
    // }



});