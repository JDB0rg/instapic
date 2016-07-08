angular.module('inApp')
  .controller('mainFeedCtrl', function($scope, $http, userFeedService, $rootScope){

    // $scope.since = function(){
    //
    // }

    var refresh = function() {
      userFeedService.getFeed().then(function (response){
      $scope.userFeed = response;
      })
    }

      refresh();
      $rootScope.$on("upload complete", refresh)
});
