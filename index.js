//// requireds ////////////////
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./config.js');
var sessions = require('express-session')

//// controllers ///////////
var userCtrl = require('./js/userCtrl')
var photoCtrl = require('./js/photoCtrl')
var imagectrl = require('./js/imagectrl')
var passctrl = require('./js/passctrl')

//// services ///////////
var passport = require('./js/passport');

//// Passport Policy //////////
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

//// app.use ////////
var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(cors());

//// Passport Express Stuff /////////////
/////// should this say config??????
app.use(sessions({
  secret: config.secret,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
/////////////////////////////////

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/insta-mongoose');

//// bring in models
// var userScema = require('./userSchema')
var UserMod = require('./userSchema.js')

//// User Endpoints
////Passport Endpoints with passport ///////
app.post('/api/user', passctrl.register)
app.get('/me', passctrl.me);
app.put('/users/:_id', isAuthed, passctrl.update);

app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});
////////////Passport End/////////////
app.post('/api/user', userCtrl.createUser)
////get user
app.get('/api/user', userCtrl.getUsers)
// app.get('/api/user/:id', userCtrl.getUserId)
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
app.post('/api/photo/:id', photoCtrl.updateHearts);

////listening to server
var port = 4000;
app.listen(port, function(){
  console.log("Started server on port", port);
})
