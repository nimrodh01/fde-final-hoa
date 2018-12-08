app.factory("messages", function ($q, $http, user,community) {
    
    var messages = {};
    var wasEverLoaded = {};

    function Message(plainMessage) {
        this.createdBy = user.getActiveUser().id;
        this.communityId = user.getActiveUser().communityId;
        this.createdAt = newDate.today() + " @ " + newDate.timeNow();
        this.title = plainMessage.title;
        this.detail = plainMessage.details;
        this.severity = plainMessage.severity;
    }
    // For todays date;
    Message.prototype.today = function () {
        return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
    }

    // For the time now
    Message.prototype.timeNow = function () {
        return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
    }



    function getCommunityMessages() {
        var async = $q.defer();

        var communityId = community.getActiveUser().communityId;

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (wasEverLoaded[communityId]) {
            async.resolve(messages[communityId]);
        } else {
            messages[communityId] = [];
            var getMessagesURL = "http://my-json-server.typicode.com/nimrodh01/fed-final-hoa/messages?userId=" + communityId;

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

        var userId = user.getActiveUser().id;
        var newDate = new Date();
        var newMessage = new Message({ createdBy: -1, createdAt:newDate, title: title, detail: detail, severity: severity });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newMessage).then.....

        messages[userId].push(newMessage);
        async.resolve(newMessage);

        return async.promise;
    }





    return {
        getCommunityMessages: getCommunityMessages,
        createMessage: createMessage
    }
})