angular.module("inApp")
  .service("userFeedService", function($http){

    this.getFeed = function(){
      return $http({
          method: 'GET',
          url: '/api/photo'
        }).then(function (response) {
          console.log("get" + response);
          return response.data;
        })
    },
    this.postFeed = function(){
      return $http({
          method: 'POST',
          url: '/api/photo'
        }).then(function (response) {
          console.log("get" + response);
          return response.data;
        })
    }
})
