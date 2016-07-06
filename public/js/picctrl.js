angular.module('inApp')
  .controller('picctrl', function($scope, imagesService, $http) {

    $scope.images = [];
    
    //
    // $scope.uploadPhoto = function(){
    //     imagesService.storeImage(imageData, fileName)
    //     .then(function(response){
    //       alert("upload complete!")
    //     })
    // }
})
