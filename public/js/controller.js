angular.module('inApp')
  .controller('inCtrl', function($scope, $http, service){

    $scope.test = "controller connection test";
    $scope.dataLink = service.servTest;
    $scope.userPics = service.userGallery;

    $scope.date = service.servDate;

    service.getFeed().then(function (response){
      $scope.userFeed = response;
    })
  });
