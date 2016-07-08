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
        controller: 'userFeedCtrl',
        resolve: {
          currentMan: function (userFeedService) {
            return userFeedService.userPhotos()
          }
        }
      })
      .state("edit", {
        templateUrl: "./views/edit.html",
        url: "/edit"
      })

        $urlRouterProvider.otherwise("login")
  })
