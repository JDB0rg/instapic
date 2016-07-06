angular.module("inApp")
  .service("service", function($http){

    this.getFeed = function(){
      return $http({
          method: 'GET',
          url: '/api/photo'
        }).then(function (response) {
          console.log("get" + response);
          return response.data;
        })
    }

    // this.addPhoto = function(photo){
    //     return $http({
    //         method: 'POST',
    //         url: '/api/photo',
    //         data: photo
    //       }).then(function (response) {
    //         console.log("post" + response);
    //         return response.data;
    //
    //       })
    //     }

    this.servTest = [
      {
      "name": "Preston McNeil",
      "pic_square": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/1117694_1614542_108355616_q.jpg",
      "big_pic": "./img/img-srvc/01.jpg",
      "comment": " I love this photo it speaks to my soul.",
      "post_date": "1/12/2015"
      },
      {
      "name": "Frank Castle",
      "pic_square": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/1117694_1614542_108355616_q.jpg",
      "big_pic": "./img/img-srvc/02.jpg",
      "comment": " Woah this is super cool.",
      "post_date": "5/27/2015"
      },
      {
      "name": "Jon Galt",
      "pic_square": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/1117694_1614542_108355616_q.jpg",
      "big_pic": "./img/img-srvc/03.jpg",
      "comment": " What did you shoot this with?",
      "post_date": "3/04/2016"
      }
    ]



    var date1 = new Date(this.servTest[1].post_date);
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(timeDiff);
    console.log(diffDays);

      if(diffDays === 0) this.servDate = " today";
      else if  (diffDays === 1) this.servDate = 1 + " day";
      else if  (diffDays <= 31) this.servDate = "23 days";
      else if  (diffDays >= 31) this.servDate = "2 weeks";

  })
