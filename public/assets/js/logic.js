
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
    //location.reload();
    console.log(dataca);
  })// end of retrieving data
}) // end of on click


$(document).on("click", "h5", function() {
  $("#messages").empty();
  console.log("clicking on this h5")
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/clip/" + thisId
  })
  .then(function(data) {
    // console.log(data);
    console.log(data);
    $("#messages").append("<h4>" + data.title + "</h4>");
      // An input to enter a new title
      $("#messages").append("<input id='titleinput' val='"+data.name +"' name='title' >");
      // A textarea to add a new note body
      $("#messages").append("<textarea id='bodyinput' name='body'>"+data.body+"</textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#messages").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

    if (data.comment) {
      $("#titleinput").val(data.comment.name);
      $("#bodyinput").val(data.comment.body);

    }
  })
})


$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("Saving note....");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/clip/" + thisId,
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
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
