"use strict";
var Score = require("../models/score");

exports.score_save = function(highScore) {
	console.log("Saving score " + highScore);
	var testResult = testScore(highScore);

	if(testResult === true) {
		var score = new Score({
			value: highScore
		});
		score.save(
			function (err) {
                if (err) { 
                	console.log("Saving score failed.");
                	return; }
				console.log("Score saved " + highScore);
        });
	}
	else {
		console.log("Score not number: " + highScore);
	}
};

exports.score_list = function(req, res, next) {
	Score.find()
	.populate('user')
	.sort([["value", "descending"]])
	.exec(function (err, list_score) {
      if (err) { console.log(err); return next(err); }
      //Successful, so render
      res.render('scoreboard', { title: "Scoreboard", score_list: list_score });
    });
};

function testScore(score) {
	var regex = RegExp("^[0-9]+$");
	return regex.test(score);
};

exports.remove_all_scores = function() {
	console.log("Remove all scores");
	Score.find()
		.remove()
		.exec();
}