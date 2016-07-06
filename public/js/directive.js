angular.module("inApp")
  .directive('navbar', function() {

    return {
        templateUrl: "./views/nav.html",
        controller: "picctrl"
    };
});
