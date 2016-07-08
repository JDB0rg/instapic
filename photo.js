var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  author       :  {type: mongoose.Schema.ObjectId, required: false, ref: "User"},
  photo        :  {type: String, required: true},
  hearts       :  {type: Number, required: false, default: 0},
  comments     :  {type: String, required: false},
  createdAt    :  {type: Date, required: true}
  })

  module.exports = mongoose.model('Photo', photoSchema)
