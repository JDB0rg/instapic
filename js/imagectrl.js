var AWS = require('aws-sdk');
var config = require('../config.js');
AWS.config.region = 'us-west-2';
var Photo = require('./../photo.js')
var User = require('../userSchema')

//set up our AWS config with Amazon keys
//region URL https://dynamodb.us-west-2.amazonaws.com

AWS.config.update({
    accessKeyId: config.amazonAccess,
    secretAccessKey: config.amazonSecret,
    region: config.amazonRegion
});
console.log(config);

var s3 = new AWS.S3();
var exports = module.exports = {};
//////new DB Doc////////

exports.saveImage = function (req, res) {
  var buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // bucketName var below crates a "folder" for each user
  var bucketName = 'image-jb-upload/' + req.body.userEmail;
  var params = {
      Bucket: bucketName
    , Key: req.body.imageName
    , Body: buf
    , ContentType: 'image/' + req.body.imageExtension
    , ACL: 'public-read'
  };

  s3.upload(params, function (err, data) {
    if (err) return res.status(500).send(err);

    // TODO: save data to mongo ///// this guy!?! push this to db?
    ///// make the magic here.

    Photo.create({photo: data.Location, author: req.user._id, createdAt: new Date()} , function (err, data) {
      console.log(err, data);
      if (err) return res.status(500).send(err);

      User.findByIdAndUpdate(req.user._id, {$push: {photo: data._id}} , function (err, data) {
          console.log(err, data);
          if (err) return res.status(500).send(err);

          res.status(data);
      res.status(data);

      })
    })

      res.json(data);
  });
}

// exports.postImage = function(req, res, next) {
//
//     var s3bucket = new AWS.S3({params: {Bucket: 'picBucket'}});
//       s3bucket.createBucket(function() {
//     var params = {Key: 'myKey', Body: 'Hello!'};
//       s3bucket.upload(params, function(err, data) {
//       if (err) {
//         console.log("Error uploading data: ", err);
//       } else {
//         console.log("Successfully uploaded data to picBucket/myKey");
//       }
//     });
//   });
// }
