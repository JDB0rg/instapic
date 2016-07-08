// image converted to 64 bit string directive3
angular.module('inApp')
.directive('fileread', function (imagesService) {

  return {
    restrict: 'A',
    scope: {
        profile: '=',
        images: '='
    },
    link: function (scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {

          var fileread = loadEvent.target.result;
          // console.log(fileread);

          console.log(elem);
          var tempArray = elem[0].value.split('\\');
          var fileName = tempArray[tempArray.length - 1];

          imagesService.storeImage(fileread, fileName)
            .then(function(result) {
                  scope.images.unshift(result.data);
                  console.log("finished" + result);

            })
            .catch(function(err){
              console.log(err);
            });
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
})
