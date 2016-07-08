var UserMod = require('../userSchema')

module.exports = {

  createUser: function (req, res, next) {
    var UserObj = new UserMod(req.body);
      UserObj.save(function(err, response){
        if(err) {
          return res.status(500).json(err);
        } else {
          return res.json(response);
        }
    })
  },

  getUsers: function(req, res, next){
    UserMod.find( function(err, response){
      if(err) {
        res.status(500).json(err)
      } else {
        res.json(response)
      }
    })
  },

  // getUserId: function (req, res, next) {
  //     UserMod.findById(req.user, function(err, response){
  //     // UserMod.findById(req.params.id, function(err, response){
  //       if(err) {
  //         res.status(500).json(err)
  //       } else {
  //         res.json(response)
  //       }
  //     })
  // },

  updateUserId: function (req, res, next) {
    if(!req.params.id){
  		return res.status(400).send('id query needed');
  	}
      UserMod.findByIdAndUpdate(req.params.id,
        req.body,
        {new: true, upsert: true},
        function(err, response){
          if(err) {
            return res.status(500).send(err);
          } else {
            return res.send(response);
          }
        })
      }

}
