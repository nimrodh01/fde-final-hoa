var app = angular.module("HOApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/home.html"
        })
        // .when("//", {
        //     templateUrl: "app/home/home1.html"
        // })
        .when("/login", {
            templateUrl: "app/login/login.html",
            controller: "loginCtrl"
        })
        .when("/newMessage", {
            templateUrl: "app/message/new-message.html",
            controller: "messageCtrl"
        })
    // .when("/signup", {

    //     }).when("/recipes", {
    //         templateUrl: "app/recipes/recipeGallery.html",
    //         controller: "recipeGalleryCtrl"
    //     }).when("/new" , {
    //         templateUrl: "app/recipes/newMessage.html",
    //         controller: "newMessageCtrl"
    //     }).when("/recipe/:id" , {

    //     })
})

