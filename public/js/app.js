angular.module('inApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state("signup", {
        templateUrl: "./views/signup.html",
        url: "/signup"
      })
      .state("login", {
        templateUrl: "./views/login.html",
        url: "/login"
      })
      .state("feed", {
        templateUrl: "./views/feed.html",
        url: "/feed",
        controller: 'mainFeedCtrl'
      })
      .state("userFeed", {
        templateUrl: "./views/user-feed.html",
        url: "/user-feed",
        controller: 'userFeedCtrl'
      })
      .state("edit", {
        templateUrl: "./views/edit.html",
        url: "/edit"
      })
      // .state("upload", {
      //   templateUrl: "./views/upload.html",
      //   url: "/upload"
      // })

        $urlRouterProvider.otherwise("login")
  })
