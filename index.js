var express = require("express");
var path = require("path")

var app = express();
var PORT = 3000;

app.set('view engine', 'pug');

app.get('*', function (req, res) {
  res.render('index');
});

app.listen(3000, function () {
  console.log("Server is running on port " + PORT);
});