// // need to export
var db = require("../models");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
// var express = require("express");
// var app = express();

mongoose.connect("mongodb://localhost/newssite", { useNewUrlParser: true });

module.exports = function(app) {


  app.get("/scrape", function (req, res) {
console.log("Scraping!!")
    // axios.get("http://www.nfl.com/videos/nfl-game-highlights").then(function (response) {
      axios.get("https://www.reuters.com/news/oddlyEnough").then(function(response) {

      // Load the HTML into cheerio and save it to a variable
      // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
      var $ = cheerio.load(response.data);
      $(".ImageStoryTemplate_image-story-container").each(function(i, element) {
        // Save an empty result object
        // console.log(element);
        var result2 = {};
        
        // console.log($(this));
        result2.title = $(this).find("h2").text();
        result2.info = $(this).children().find("p").text();
        result2.img = $(this).find("img").attr("src");
        result2.link = $(this).children().children().find("a").attr("href");
        
        console.log(result2.title);

        // DAVE: Maybe add a findOne on the link to see if that exists already.
        // That means we already have that link in our DB, so don't scrape.
        // Otherwise, do the code below:
        db.Clip.create(result2)
          .then(function(dbClip) {
            // View the added result in the console
            console.log(dbClip);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.json("Scrape Complete");
    });
  }); // end of scrape
    
// getting single clip
app.get("/clip/:id", function(req, res) {
  db.Clip.findOne({_id : req.params.id})
  .populate("comment")
  .then(function (dbcomment) {
    console.log(dbcomment);
    console.log("HELOOO")
    res.json(dbcomment)
  })
  .catch(function(err){
    res.json(err);
  })
})

app.post("/clip/:id", function(req, res) {
  db.Comment.create(req.body)
  .then(function (dbcomment){
    return db.Clip.findOneAndUpdate({_id: req.params.id}, {$push: {comment: dbcomment._id}}, {new: true});
  })
  .then(function(dbdata) {
    res.json(dbdata)
  })
  .catch(function(err){
    res.json(err);
  })
});

app.get("/scrapestock", function (req, res) {
  console.log("Scraping!! 2nd website")
      // axios.get("http://www.nfl.com/videos/nfl-game-highlights").then(function (response) {
        axios.get("https://www.fool.co.uk/").then(function(response2) {
  console.log("got 2nd website");
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response2.data);
        $(".wrapper").each(function(i, element) {
          // Save an empty result object
          console.log("got class of website")
          // console.log(element);
          var result3 = {};
          
          // console.log($(this));
          result3.source = $(this).find("p").text();
          result3.link = $(this).attr("href");
          result3.img = $(this).find("img").attr("src");
          result3.info = $(this).find("p").find("h3").text();
          // result3.article = $(this).find("img").attr("alt");

          console.log(result3.source);
          db.Stock.create(result3)
            .then(function(dbStock) {
              // View the added result in the console
              console.log(dbStock);
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
        });
    
        // Send a message to the client
        res.json("Scrape2 Complete");
      });
    }); // end of 2nd scrape

// end of api routes
}
