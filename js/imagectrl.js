var AWS = require('aws-sdk');
var config = require('../config.js');
AWS.config.region = 'us-west-2';

//set up our AWS config with Amazon keys
//region URL https://dynamodb.us-west-2.amazonaws.com

AWS.config.update({
    accessKeyId: config.amazonAccess,
    secretAccessKey: config.amazonSecret,
    region: config.amazonRegion
});
// create keys.js??
// var keys = require('./keys.js');
var s3 = new AWS.S3();
var exports = module.exports = {};

exports.saveImage = function (req, res) {
  buf = new Buffer(req.body.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

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
    console.log(err, data);
    if (err) return res.status(500).send(err);

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
