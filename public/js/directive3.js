// image converted to 64 bit string directive3
angular.module('inApp')
.directive('fileread', function (imagesService) {

  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {

          var fileread = loadEvent.target.result;
          console.log(fileread);

          // console.log(elem);   // caught on tempArray line 17
          // var tempArray = elem[0].value.split('\\');
          // var fileName = tempArray[tempArray.length - 1];

          imagesService.storeImage(fileread, fileName)
            .then(function(result) {
              scope.images.unshift(result.data);
            })
            .catch(function(err){
              console.log(err);
            })

            var tempArray = elem['context'].value.split('\\');
            var fileName = tempArray[tempArray.length - 1];

        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
})

.controller('imagectrl', function ($scope) {
  $scope.images = [];
});
