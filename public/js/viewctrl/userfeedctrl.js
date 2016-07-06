angular.module('inApp')
  .controller('userFeedCtrl', function($scope, $http, userFeedService){

    userFeedService.getFeed().then(function (response){
    $scope.userFeed = response;
    })
});

// pics urls
// http://3.bp.blogspot.com/-Cys5ZMMK9H0/VZw3ko3RyHI/AAAAAAAABF4/73MIlQhghw8/s1600/01-onemoregoodone-george-byrne-photography-los-angeles.jpg
// http://3.bp.blogspot.com/-loGeKO_TL64/VZw4ROa8mTI/AAAAAAAABGA/C_81tN4LTpc/s1600/02-onemoregoodone-george-byrne-photography-los-angeles.jpg
// http://2.bp.blogspot.com/-780WCvE5VeA/VZw4RAPwn1I/AAAAAAAABGE/kJjOf1RqwWk/s1600/03-onemoregoodone-george-byrne-photography-los-angeles.jpg
// http://3.bp.blogspot.com/-XCMzVArLgvI/VZw5IPb-_OI/AAAAAAAABGU/mZn2hiaf2SY/s1600/04-onemoregoodone-george-byrne-photography-los-angeles.jpg
// http://2.bp.blogspot.com/-2jz4B8iUdHk/VZw5IXnNMPI/AAAAAAAABGY/Pg622F2Z8d8/s1600/05-onemoregoodone-george-byrne-photography-los-angeles.jpg
// http://3.bp.blogspot.com/-vdsH4bZrYt0/VZw6Yhem9-I/AAAAAAAABGk/U9H9Z0LzymM/s1600/06-onemoregoodone-george-byrne-photography-los-angeles.jpg
// http://1.bp.blogspot.com/-bUgqXjc_s7k/VZw6YtohwSI/AAAAAAAABG8/8Z0QOdXCsHc/s1600/07-onemoregoodone-george-byrne-photography-los-angeles.jpg
// http://2.bp.blogspot.com/-gC2tkvbqlCA/VZw6YrPLjYI/AAAAAAAABGo/5HOLKYcoarY/s1600/08-onemoregoodone-george-byrne-photography-los-angeles.jpg
// http://3.bp.blogspot.com/-p8ujptiU3fM/VZw6ZHKFsKI/AAAAAAAABGs/x-mE8oRKsn8/s1600/09-onemoregoodone-george-byrne-photography-los-angeles.jpg
// http://1.bp.blogspot.com/-fz8EWqaensE/VZw76_SzTsI/AAAAAAAABHM/5o9pjS-D-SQ/s1600/10-onemoregoodone-george-byrne-photography-los-angeles.jpg
