// Dependencies
// require("dotenv").config();
var express = require("express");
// var mongojs = require("mongojs");
// var axios = require("axios");
// var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
// var models = require("./models");
var mongoose = require("mongoose");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://moshecstern@gmail.com:password1@ds253388.mlab.com:53388/heroku_8ch0gv8c" || "mongodb://localhost/newssite";
// Connect to the Mongo DB
PORT = process.env.PORT || 3000;
// mongoose.connect("mongodb://localhost/newssite", { useNewUrlParser: true });
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, { uri_decode_auth: true });

// Initialize Express
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
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // app.use('/', index);
  // app.use('/articles', articles);
  // app.use('/notes', notes);
  // app.use('/scrape', scrape);

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



// Set the app to listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port "+ PORT+ " !");
});