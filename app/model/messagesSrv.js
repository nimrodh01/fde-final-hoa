app.factory("messages", function ($q, $http, user) {

    var messages = {};
    var wasEverLoaded = {};

    function Message(plainMessage) {
        this.createdBy = plainMessage.createdBy;
        this.createdAt = newDate.today() + " @ " + newDate.timeNow();
        this.title = plainMessage.title;
        this.detail = plainMessage.detail;
        this.priority = plainMessage.priority;
        this.userId = plainMessage.userId;
    }
    // For todays date;
    Message.prototype.today = function () {
        return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
    }

    // For the time now
    Message.prototype.timeNow = function () {
        return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
    }



    function getActiveUserMessages() {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (wasEverLoaded[userId]) {
            async.resolve(messages[userId]);
        } else {
            messages[userId] = [];
            var getMessagesURL = "http://my-json-server.typicode.com/nimrodh01/fed-final-hoa/messages?userId=" + userId;

            $http.get(getMessagesURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var message = new Message(response.data[i]);
                    messages[userId].push(message);
                }
                wasEverLoaded[userId] = true;
                async.resolve(messages[userId]);
            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function createMessage(title, detail, priority, comments) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;
        var newDate = new Date();
        var newMessage = new Message({ createdBy: -1, createdAt:newDate, title: title, detail: detail, priority: priority });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/nirch/recipe-book-v3/recipes", newMessage).then.....

        messages[userId].push(newMessage);
        async.resolve(newMessage);

        return async.promise;
    }





    return {
        getActiveUserMessages: getActiveUserMessages,
        createMessage: createMessage
    }
})