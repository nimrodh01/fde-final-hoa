app.controller("messageCtrl", function($scope, messages, $location, user) {
    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }

    // Variables
    $scope.title="Hallo";
    $scope.details="";
    $scope.sevirity =$scope.sevirityValues[0]; 
    $scope.sevirityValues = [ {id: 1, label: "Info"}, {id: 2, label: "Urgent"}, {id: 3, label: "Critical"} ];

    $scope.createMessage = function () {
        messages.createMessage($scope.title, $scope.details, 
            $scope.severity).then(function () {
            $location.path("/messages")
        }, function (err) {
            console.log(err);
        })
    }




    $scope.clearForm = function() {
        // clear the fields
        $scope.title = '';
        $scope.details = '';
      };

      $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
      };

})