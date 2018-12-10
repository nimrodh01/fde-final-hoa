app.factory("community", function ($scope) {

    $scope.communities = [];

    function Community(community) {
        this.communityId = community.communityId;
        this.name = community.name;
        this.address = {
            number: number,
            streetName: streetName,
            zipCode: zipCode,
            state: state,
            country: country
        }
    }

    function createCommunity(name) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;
        var newDate = new Date();
        var newMessage = new Community({ createdBy: -1, communityId: name });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newMessage).then.....

        messages[userId].push(newMessage);
        async.resolve(newMessage);

        return async.promise;
    }

    function getCommunityName()
    {
        
    }

    function isCurrentCommunity() {
        return community ? true : false;
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        getActiveUser: getActiveUser
    }
})