angular.module('inApp')
  .controller('editCtrl', function($scope, $http, userFeedService){

    userFeedService.getFeed().then(function (response){
    $scope.userFeed = response;
    })
});
