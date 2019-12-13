var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StockSchema = new Schema({
    // title: title, video: video, img: img
    // `title` is required and of type String
    source: {
      type: String,
    //   required: true
    },
    // `link` is required and of type String
    link: {
      type: String,
    //   required: true
    },
    img: {
        type: String
    },
    title:{
        type: String
    },
    article:{
        type: String
    },
    
    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
   
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  });
  
  // This creates our model from the above schema, using mongoose's model method
  var Stock = mongoose.model("Stock", StockSchema);
  


module.exports = Stock;
