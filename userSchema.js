///// Product Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name        :  {type: String, unique: true, required: true, index: true},
  username    :  {type: String, unique: true, required: true},
  email       :  {type: String, unique: true, required: true},
  password    :  {type: String, unique: true, required: true},
  //optional
  website     :  {type: String},
  phone       :  {type: Number},
  gender      :  {type: String, enum: ['Male', 'Female']},
  bio         :  {type: String}
})

module.exports = mongoose.model('User', userSchema)
/// use User to refer to this User Model.
/// the Collection will be called Users like many.
