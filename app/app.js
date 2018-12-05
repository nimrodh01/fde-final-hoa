var app = angular.module("HOApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/home/home.html"
        })
        .when("/in", {
            templateUrl: "app/home/home1.html"
        })
        .when("/login", {
            templateUrl: "app/login/login.html",
            controller: "loginCtrl"
        })
    // .when("/signup", {

    //     }).when("/recipes", {
    //         templateUrl: "app/recipes/recipeGallery.html",
    //         controller: "recipeGalleryCtrl"
    //     }).when("/new" , {
    //         templateUrl: "app/recipes/newRecipe.html",
    //         controller: "newRecipeCtrl"
    //     }).when("/recipe/:id" , {

    //     })
})

