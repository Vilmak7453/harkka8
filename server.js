var express = require("express");
var app = express();
var server = require("http").Server(app);

const PORT = 3000;

app.use(express.static(__dirname + "/game"));

app.get("/", function(req,res) {
	res.sendFile(__dirname + "/index.html");
});

server.listen(PORT, function() {
	console.log(`Listening on ${PORT}`);
});