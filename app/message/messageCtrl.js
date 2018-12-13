app.controller("messageCtrl", function ($scope, $log, messages, $location, user) {
    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    // Variables
    $scope.title = "";
    $scope.details = "";
    $scope.sevirityValues = [{ id: 1, label: "Info" }, { id: 2, label: "Urgent" }, { id: 3, label: "Critical" }];
    $scope.sevirity = $scope.sevirityValues[0].label;


    $scope.createMessage = function () {
        messages.createMessage($scope.title, $scope.details,
            $scope.severity).then(function () {
                $location.path("/messages")
            }, function (err) {
                console.log(err);
            })
    }

    $scope.clearForm = function () {
        // clear the fields of new message form
        $scope.title = '';
        $scope.details = '';
    };

    $scope.toggled = function (open) {
        $log.log('Dropdown is now: ', open);
    };


    // recipes.getActiveUserRecipes().then(function (recipes) {
    //     $scope.recipes = recipes;
    // }, function (error) {

    // })

    // $scope.communityMessages = {};
    // $scope.getAllMessages = function () {
    //     $scope.communityMessages = messages.getCommunityMessages();
    //     console.log($scope.communityMessages)
    // }

    $scope.hoverIn = function () {
        this.hoverEdit = true;
    };

    $scope.hoverOut = function () {
        this.hoverEdit = false;
    };
    
    $scope.showMore=false;
    $scope.toggleDetails = function() { 
       $scope.showMore = !$scope.showMore;
     };


    // This function wil return an Array containing all messages belings to the community and stored in "DB"
    $scope.getMyMessages = function () {
        $scope.communityMessages=[];
        messages.getCommunityMessages().then(function (messages) {
            $scope.communityMessages = messages;
        }, function (error) {

        })
    }

})