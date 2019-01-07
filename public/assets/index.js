$(document).ready(function() {
	
	$(".navbar-burger").on("click", function() {
		$(".navbar-burger").toggleClass("is-active");
		$(".dropdown").toggle();
		$(".dropdown").toggleClass("is-open");
	});

	// Grab the articles
	$.getJSON("/articles", function(data) {
	  // For each one
	  for (var i = 0; i < data.length; i++) {
	    // Display the information on the page
	    $("#scrape-results").prepend("<div class='result-div'><p class='result-text'>" +data[i].title + "<br>" + data[i].description +
	    	"</p><button class='save-article button is-info is-medium' data-id='" + data[i]._id + "'><span class='icon'><i class='fa fa-bookmark'></i></span>Save Article</button></div>");
	  }
	});

	$(document).on("click", ".save-article", function() {
		// change icon to check mark
		$(this).children("span.icon").children("i.fa-bookmark").removeClass("fa-bookmark").addClass("fa-check-circle");
		// Get article id
		var articleID = $(this).attr("data-id");
		console.log(articleID);
		// Run a POST request to update the article to be saved
	  $.ajax({
	    method: "POST",
	    url: "/save/" + articleID,
	    data: {
	      saved: true
	    }
	  }).done(function(data) {
      // Log the response
      console.log("data: ", data);
		});
	});
});