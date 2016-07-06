var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  author       :  {type: mongoose.Schema.ObjectId, required: false, ref: "User"},
  photo        :  {type: String, required: true}
  })

  module.exports = mongoose.model('Photo', photoSchema)
