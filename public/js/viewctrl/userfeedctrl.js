angular.module('inApp')
  .controller('userFeedCtrl', function($scope, $http, userFeedService, currentMan, $rootScope){

    $scope.userPicFeed = currentMan;

    var refresh = function() {
      userFeedService.userPhotos().then(function(anyParam){
      $scope.userPicFeed = anyParam
      })
    }
    $rootScope.$on("upload complete", refresh)

});

///////////////
