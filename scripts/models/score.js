"use strict";
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ScoreSchema = new Schema(
  {
  	user: {type: Schema.Types.ObjectId, ref: 'User', default: null},
  	value: {type: Number, require: true},
    date: {type: Date, default: Date.now}
  }
);

ScoreSchema.virtual('date_formatted').get(function() {
	return moment(this.due_back).format('DD.MM.YY');
});

//Export model
module.exports = mongoose.model('Score', ScoreSchema);