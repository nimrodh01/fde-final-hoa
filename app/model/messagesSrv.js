app.factory("messages", function ($q, $http,user) {

    var messages = {};
    // var messagesComunities = [];
    var wasEverLoaded = {};

    function Message(plainMessage) {
        // var userId = plainMessage.userId;
        var newDate = new Date();
        this.createdBy = plainMessage.createdBy;
        this.communityId = plainMessage.communityId;
        if (!plainMessage.createdAt)
            this.createdAt = newDate;
        else
            this.createdAt = plainMessage.createdAt;
        this.title = plainMessage.title;
        this.details = plainMessage.detail;
        this.severity = plainMessage.severity;
    }

    function formatDate(date) {
        var myDate = (date.getDate() < 10) ? "0" : "" + date.getDate() + "/" + (((date.getMonth() + 1) < 10) ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear();
        var myTime = (date.getHours() < 10) ? "0" : "" + date.getHours() + ":" + ((date.getMinutes() < 10) ? "0" : "") + date.getMinutes() + ":" + ((date.getSeconds() < 10) ? "0" : "") + date.getSeconds();

        return (myDate + " " + myTime)
    }




    function getCommunityMessages() {
        var async = $q.defer();
        var communityId = user.getActiveUser().communityId;

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (wasEverLoaded[communityId]) {
            async.resolve(messages[communityId]);
        } else {
            messages[communityId] = [];
            var getMessagesURL = "http://my-json-server.typicode.com/nimrodh01/fed-final-hoa/messages?communityId=" + communityId;

            $http.get(getMessagesURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var message = new Message(response.data[i]);
                    messages[communityId].push(message);
                }
                wasEverLoaded[communityId] = true;
                async.resolve(messages[communityId]);
            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }

    function createMessage(title, detail, severity) {
        var async = $q.defer();
        var createdBy = user.getActiveUser().userId
        var communityId = user.getActiveUser().communityId;
        var newMessage = new Message({ title: title, createdBy: createdBy, communityId: communityId, detail:detail, severity:severity });
        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newMessage).then.....
        // messages[communityId] = [];
        messages[communityId].unshift(newMessage);
        async.resolve(newMessage);
        return async.promise;
    }





    return {
        getCommunityMessages: getCommunityMessages,
        createMessage: createMessage
    }
})