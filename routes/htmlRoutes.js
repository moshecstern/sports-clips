var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    db.Clip.find({})
      .then(function (dbClips) {
        db.Stock.find({})
        .then(function (dbStock) {
          db.Comment.find({})
          .then(function (dbComment){
            res.render("index", {
              Clip: dbClips,
              Stock: dbStock,
              Comment: dbComment
            })
          });
        });
      });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
} // end of exports