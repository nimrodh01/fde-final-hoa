app.controller("mesaageCtrl", function($scope, messages, $location, user,$log) {
    
    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    if (!user.isLoggedIn()) {
        $location.path("/");
        return;
    }
    $scope.form = { };
    $scope.sevirity = []; 
    $scope.sevirityValues = [ {id: 1, label: "Info"}, {id: 2, label: "Urgent"}, {id: 3, label: "Critical"} ];

    $scope.createMessage = function () {
        messages.createMessage($scope.name, $scope.description, 
            $scope.ingrediants, $scope.steps,  $scope.image).then(function () {
            $location.path("/recipes")
        }, function (err) {
            console.log(err);
        })
    }




    $scope.clearForm = function() {
        // clear the fields
        $scope.title = '';
        $scope.details = '';
        $scope.model.requiredimmediate = '';
        // reset our internal state
        $scope.model.formstatus = 'unsubmitted';
        // reset the field validation for the form
        $scope.form.test.$setPristine();
      };

      $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
      };

      $scope.items = ['High','Medium','Low'];
})