var query;

$("#scrapefb").on("click", function (datab) {
  console.log("clicked!");
  event.preventDefault();
  console.log(datab)
  $.get("/scrape", function (databa) {
    location.reload();
    console.log(datab);
  })// end of retrieving data
}) // end of on click


$("#scrapestock").on("click", function (event) {
  console.log("clicked!");
  event.preventDefault();
  $.get("/scrapestock", function (dataca) {
    location.reload();
    console.log(dataca);
  })// end of retrieving data
}) // end of on click



$(".addmessage").on("click", function() {
  var thistype = $(this).attr("data-class");
  if(thistype === "news"){
    query = "/clip/";
  }else if(thistype === "stock"){
    query = "/stock/"
  }
  console.log("********")
  console.log(thistype);
  console.log("*********")
  $("#messages").empty();
  var thisId = $(this).attr("data-id");
  console.log("clicking on "+thisId+" adding clicked")
  $.ajax({
    method: "GET",
    url: query + thisId
  })
  .then(function(data) {
    // console.log(data);
    console.log(data);
    var body;
    if(data.body == undefined){
      body = "Add Your Message Here"
    } else {
      body = data.body
    }
    $("#messages").append("<h5>" + data.title + "</h5>");
      // An input to enter a new title
      $("#messages").append("<input id='titleinput' val='"+data.name +"' name='title' >");
      // A textarea to add a new note body
      $("#messages").append("<textarea id='bodyinput' name='body'>"+body+"</textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#messages").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

    if (data.comment) {
      $("#titleinput").val(data.comment.name);
      $("#bodyinput").val(data.comment.body);

    }
// }); // end of 2nd ajax call
  }) // end of first ajax call
}) // end of on click function


$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("Saving note....");
  var thistype = $(this).attr("data-class");
  if(thistype === "news"){
    query = "/clip/";
  }else if(thistype === "stock"){
    query = "/stock/"
  }
  $.ajax({
    method: "POST",
    url: query + thisId,
    data: {
      // Value taken from title input
      name: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the messages section
      $("#messages").empty();
      location.reload();

    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// delete all messsages
$("#clear-all-messages").on("click", function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/clearallmessages",
    success: function(response) {
      $(".allmessages").empty();
      location.reload();
    }
  });
});

// delete all clips
$("#clear-all-clips").on("click", function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/clearallclip",
    success: function(response) {
      // $(".allmessages").empty();
      location.reload();
    }
  });
});

// delete all clips
$("#clear-all-stocks").on("click", function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/clearallstock",
    success: function(response) {
      // $(".allmessages").empty();
      location.reload();
    }
  });
});





// delete post
$(document).on("click", ".deletemessage", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("Deleting message ....");
  console.log(thisId);
  $.ajax({
    method: "GET",
    url: "/deletemessage/" + thisId
  }).then(function(){
    location.reload();
    $("#titleinput").val("");
    // Value taken from note textarea
     $("#bodyinput").val("");
  })
});


// delete stock or clip specific

$(document).on("click", ".deleteid", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("Deleting news or clip ....");
  console.log(thisId);
  var thistype = $(this).attr("data-class");
  if(thistype === "news"){
    query = "/deleteclip/";
  }else if(thistype === "stock"){
    query = "/deletestock/"
  }
  console.log(thistype)
  $.ajax({
    method: "GET",
    url: query + thisId
  }).then(function(){
    location.reload();
    // $("#titleinput").val("");
    // // Value taken from note textarea
    //  $("#bodyinput").val("");
  })
});

// update-comment    not done yet
$(".update-comment").on("click", function() {
  // var thistype = $(this).attr("data-class");
  $("#messages").empty();
  var thisId = $(this).attr("data-id");
  console.log("********")
  console.log(Comment.name);
  // console.log(thistype);
  console.log("*********")
  console.log("clicking on "+thisId+" adding clicked")
  $.ajax({
    method: "GET",
    url: "/updatecomment/" + thisId
  })
  .then(function(data) {
    // console.log(data);
    // console.log(data);
    var body;
    if(data.body == undefined){
      body = "Add Your Message Here"
    } else {
      body = data.body
    }
    $("#messages").append("<h5>" + data.title + "</h5>");
      // An input to enter a new title
      $("#messages").append("<input id='titleinput' val='"+data.name +"' name='title' >");
      // A textarea to add a new note body
      $("#messages").append("<textarea id='bodyinput' name='body'>"+body+"</textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#messages").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

    if (data.comment) {
      $("#titleinput").val(data.comment.name);
      $("#bodyinput").val(data.comment.body);

    }
// }); // end of 2nd ajax call
  }) // end of first ajax call
}) // end of on click function

// save-article
