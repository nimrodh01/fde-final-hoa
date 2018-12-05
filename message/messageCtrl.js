app.controller("mesaageCtrl", function($scope, messages, $location, user) {
    
    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.createMessage = function () {
        messages.createMessage($scope.name, $scope.description, 
            $scope.ingrediants, $scope.steps,  $scope.image).then(function () {
            $location.path("/recipes")
        }, function (err) {
            console.log(err);
        })
    }
})