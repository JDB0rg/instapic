var User = require('../userSchema')

  module.exports = {

    register: function(req, res, next) {
      User.create(req.body, function(err, result) {
        if(err) return res.status(500).send(err);
        newUser = result.toObject();
        delete newUser.password;
        res.status(200).json(newUser);
      });
    },

    me: function(req, res, next) {
      if (!req.user) return res.status(401).send('current user not defined');
      delete User.password;
      User.find(req.user._id)
      .populate('photos')
      return res.status(200).json(req.user);
    },

    update: function(req, res, next) {
      User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
        if (err) next(err);
        res.status(200).send('user updated');
      });
    }
  };
