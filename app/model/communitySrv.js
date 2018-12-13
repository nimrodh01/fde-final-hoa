app.factory("communities", function ($http, $q) {

    communities = [];
    var wasEverLoaded = false;

    function Community(community) {
        this.communityId = community.communityId;
        this.communityName = community.communityName;
        this.address = community.address
    }




    function getAllCommunities() {
        var async = $q.defer();
        if (wasEverLoaded) {
            async.resolve(communities);
        } else {
            communities = [];
            var getCommunitiesURL = "http://my-json-server.typicode.com/nimrodh01/fed-final-hoa/communities";
            $http.get(getCommunitiesURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var community = new Community(response.data[i]);
                    communities.push(community);
                }
                wasEverLoaded = true;
                async.resolve(communities);
            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function getCommunityNameById(communityId) {
        var length = communities.length;
        var i = 0;
        while (i < length) {
            console.log(communities[i].communityId);
            if (communityId == communities[i].communityId) {
                return communities[i].communityName
            }
            else i++
        }

    }

    // function createCommunity(name) {
    //     var async = $q.defer();

    //     var userId = user.getActiveUser().userId;
    //     var newDate = new Date();
    //     var newMessage = new Community({ createdBy: -1, communityId: name });

    //     // if working with real server:
    //     //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newMessage).then.....

    //     messages[userId].push(newMessage);
    //     async.resolve(newMessage);

    //     return async.promise;
    // }


    return {
        getAllCommunities: getAllCommunities,
        getCommunityNameById: getCommunityNameById
    }
})