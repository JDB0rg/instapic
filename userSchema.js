///// Product Schema
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name        :  {type: String, unique: true, required: true, index: true},
  username    :  {type: String, unique: true, required: true},
  email       :  {type: String, unique: true, required: true},
  password    :  {type: String, unique: true, required: true},
  //optional
  photo       :  [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}],
  website     :  {type: String},
  phone       :  {type: Number},
  gender      :  {type: String, enum: ['Male', 'Female']},
  bio         :  {type: String}
});
var popfunc = function(next){
  this.populate('photo')
  return next()
}
userSchema.pre('find', popfunc)
userSchema.pre('findOne', popfunc)
userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

userSchema.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', userSchema)
/// use User to refer to this User Model.
/// the Collection will be called Users like many.
