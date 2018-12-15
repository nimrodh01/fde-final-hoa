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
    
 
   
      $scope.selectedOption = ['1','2','3'];
    //   $scope.sevirityValues = [{ id: 1, label: "Info" }, { id: 2, label: "Urgent" }, { id: 3, label: "Critical" }];

    $scope.severity = {
        severityValues: [
          {id: '1', label: 'Info'},
          {id: '2', label: 'Urgent'},
          {id: '3', label: 'Critical'}
        ],
        selectedOption: {id: '1', label: 'Info'} //This sets the default value of the select in the ui
        };




   




    $scope.createMessage = function () {
        messages.createMessage($scope.title, $scope.details,
            $scope.selectedOption).then(function (a) {
                $scope.communityMessages = a;
                $location.path("/messages")
            }, function (err) {
                console.log(err);
            })
    }


    // ############################################################### Editing Messages #####################################

    $scope.editMessageObj = {};
    $scope.updateMessage = function (message) {
        $scope.editMessageObj = message;
    }

    // ###################################################################################################
    $scope.clearForm = function () {
        // clear the fields of new message form
        $scope.title = '';
        $scope.details = '';
    };

    $scope.communityMessages = []
    $scope.removeMessage = function (message) {
        // clear the fields of new message form
        $scope.communityMessages = messages.removeMessage(message);
    };


    $scope.isUserCM = function () {
        return user.isCommitteeMember()

    }


    $scope.hoverIn = function () {
        this.hoverEdit = true;
    };

    $scope.hoverOut = function () {
        this.hoverEdit = false;
    };

    $scope.showMore = false;
    $scope.toggleDetails = function () {
        $scope.showMore = !$scope.showMore;
    };


    // This function wil return an Array containing all messages belings to the community and stored in "DB"
    $scope.getMyMessages = function () {
        // $scope.communityMessages=[];
        messages.getCommunityMessages().then(function (messages) {
            $scope.communityMessages = messages;
        }, function (error) {

        })
    }

})