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

$(function(){
	$.validator.setDefaults({
		highlight: function(element){
			$(element)
			.closest('.form-group')
			.addClass('has-error')
		},
		unhighlight: function(element){
			$(element)
			.closest('.form-group')
			.removeClass('has-error')
		}
	});
	
	$.validate({
		rules:
		{	
		    password: "required",
			birthDate: "required",
			weight: {
			    required:true,
			    number:true
			},
			height:  {
			    required:true,
			    number:true
			},
			email: {
				required: true,
				email: true
			}
		},
			messages:{			
				email: {
				required: true,
				email: true
			}
		},
				password: {
					required: " Please enter password"
				},
				birthDate: {
					required: " Please enter birthdate"
				},
				email: {
					required: ' Please enter email',
					email: ' Please enter valid email'
				},
				weight: {
					required: " Please enter your weight",
					number: " Only numbers allowed"
				},
				height: {
					required: " Please enter your height",
					number: " Only numbers allowed"
				},
			}
			
	});
});