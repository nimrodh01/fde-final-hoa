
app.controller("navbarCtrl", function ($scope, user, $location, communities) {

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

    //$scope.xx = user.getCommunityNameById;


    // $scope.communityName="Community";
    $scope.getCommunity = function () {
        if ($scope.isUserLoggedIn()){
        var communityId = user.getActiveUser().communityId;
        return communities.getCommunityNameById(communityId)
        }
        else 
        return  "Community"
       }



    // $scope.getMessages = function(){
    //     if($scope.isUserLoggedIn())
    //     return messages.getCommunityMessages();
    // }



});