// Dependencies
// require("dotenv").config();
var express = require("express");
// var mongojs = require("mongojs");
// var axios = require("axios");
// var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
// var models = require("./models");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;
var app = express();



// app.use('/js', express.static(__dirname + './../public/assets/js/logic.js'));
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
  );
  app.set("view engine", "handlebars");
  
  // Set up a static folder (public) for our web app
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true}));
  app.use(express.json());


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newssite";
// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/newssite", { useNewUrlParser: true });
mongoose.connect(MONGODB_URI);


// Set the app to listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port "+ PORT+ " !");
});