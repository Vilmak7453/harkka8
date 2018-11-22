"use strict";
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, min: 1, max: 20, required: true},
    password: {type: String, min: 4, max: 20, required: true}
  }
);

//Export model
module.exports = mongoose.model('User', UserSchema);