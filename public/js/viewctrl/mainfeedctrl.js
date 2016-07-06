angular.module('inApp')
  .controller('mainFeedCtrl', function($scope, $http, userFeedService){

    userFeedService.getFeed().then(function (response){
    $scope.userFeed = response;
    })
});
