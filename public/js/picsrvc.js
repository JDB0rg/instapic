angular.module('inApp')

  .factory('imagesService', function ($http) {
    var service = {};

    service.storeImage = function (imageData, fileName) {
      var imageExtension = imageData.split(';')[0].split('/');
      imageExtension = imageExtension[imageExtension.length - 1];

      var newImage = {
        imageName: fileName,
        imageBody: imageData,
        imageExtension: imageExtension,
        userEmail: 'obama@usa.gov'
      }

      return $http.post('/api/newimage', newImage)
    }

    return service;
});

// angular.module('inApp')
// .service('imagesService', function ($http) {
//
//   // var picService = {};
//   // picService.
//   this.storeImage = function (imageData, fileName) {
//
// // getting file extension
// var imageExtension = imageData.split(';')[0].split('/');
// imageExtension = imageExtension [imageExtension.length - 1];
//
//     var newImage = {
//       imageName: fileName,
//       imageBody: imageData,
//       imageExtension: imageExtension,
//       userEmail: 'obama@usa.gov'
//     }
//
//     // return $http.post('/api/newimage', newImage)
//     return $http({
//         method: 'POST',
//         url: '//localhost:4000/api/newimage',
//         data: newImage
//       }).then(function (response) {
//         return response;
//       })
//   }
//   // return picService;
// });
