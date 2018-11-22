"use strict";
var express = require("express");
var app = express();
var server = require("http").Server(app);
var path = require("path");
var scoreController = require("./scripts/controllers/scoreController");
var userController = require("./scripts/controllers/userController");

const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/dist'));

//Set mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'mongodb://mongo:27017/localLibrary';
var mongoDB = 'mongodb://localhost:27017/localLibrary';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/dist/views"));

app.get("/", function(req, res) {

	res.redirect("/game");
});

app.get("/game", function(req, res) {

	res.render("game", {title: "Game"});
});

app.post("/game/saveScore", function(req, res) {

	scoreController.score_save(req.body.score);
	res.redirect("/game");
});

app.get("/register", function(req, res) {

	res.render("register", {title: "Register new user"});
});

app.post("/register", userController.register_user);

app.get("/scoreboard", scoreController.score_list);

server.listen(PORT, function() {

	console.log(`Listening on ${PORT}`);
});