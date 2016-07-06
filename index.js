//// requires
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./config.js');
var sessions = require('express-session')

//// controllers
var userCtrl = require('./js/userCtrl')
var photoCtrl = require('./js/photoCtrl')
var imagectrl = require('./js/imagectrl')

//// app.use
var app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/insta-mongoose');

//// bring in models
// var userScema = require('./userSchema')
var UserMod = require('./userSchema.js')

//// User Endpoints
////create user
app.post('/api/user', userCtrl.createUser)
////get user
app.get('/api/user', userCtrl.getUsers)
app.get('/api/user/:id', userCtrl.getUserId)
////update user
app.put('/api/user/:id', userCtrl.updateUserId)

//// Photo Endpoints
app.post('/api/photo', photoCtrl.createPhoto)
////get photo
app.get('/api/photo', photoCtrl.getPhotos)
app.get('/api/photo/:id', photoCtrl.getPhotoId)
////update photo
app.put('/api/photo/:id', photoCtrl.updatePhotoId)
// New Image Post Endpoint
app.post('/api/newimage', imagectrl.saveImage);

////listening to server
var port = 4000;
app.listen(port, function(){
  console.log("Started server on port", port);
})
