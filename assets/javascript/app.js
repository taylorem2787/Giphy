//q- search query term or phrase
//limit = number of results to return, maximum 100. Default 25.
//offset = results offset, defaults to 0.
//rating = limit results to those rated (y,g, pg, pg-13 or r).
//fmt = //return results in html or json format (useful for viewing responses as GIFs to debug/test)
// ON-CLICK FUNCTION========================================================================================
$(document).ready(function(){
// TOPIC BUTTONS
var topics = ["art", "animals", "celebrities", "dance", "decades", "disney", "food", 
"funny", "love", "movies", "party hard", "politics", "random", "sports", "steal yo girl", "tupac"];

// DISPLAY BUTTONS FUNCTION==================================================================================
function displayButtons(){ 
  $('.button').empty();
    // $('#gifDiv').empty();
  //CREATE BUTTON FOR LOOP FOR EACH TOPIC
  for (var i = 0; i < topics.length; i++) {  
    var b = $('<button>') 
    //Create div class 'topic button' 
    b.addClass('topicBtn'); 
    b.attr('data-name', topics[i]); 
    b.text(topics[i]);  
    $('.button').append(b); 
  }   
}

$('#addButton').on('click', function(){
  //$('.button').empty();
  var topic = $('#topic-input').val().trim();
    topics.push(topic);
    displayButtons(); //add new button
    return false;       
})
  displayButtons(); 

$(document).on('click', '.topicBtn', displayTopic);

// DISPLAY TOPIC FUNCTION====================================================================================
function displayTopic(){
  var topic = $(this).attr('data-name');    
    //var results = $(this).data('topics');
// GIPLY API CALL============================================================================================
    var APIkey = "&api_key=dc6zaTOxFJmzC&limit=20";
    var queryURL = "https://crossorigin.me/http://api.giphy.com/v1/gifs/search?q=" + topic + APIkey;

      $.ajax({
          url: queryURL, 
          method: 'GET'
      })
      .done(function(response) {
        console.log(response.data);
        var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class="item">')

            var type = results[i].type;
            var p1 = $('<p>').text("Type: " + type);

            var rating = results[i].rating;
            var p2 = $('<p>').text("Rating: " + rating);

            var stillImage = $('<img class="gif">');
            stillImage.attr('src', results[i].images.fixed_width_still.url);
            gifDiv.append(p1);
            gifDiv.append(p2);
            gifDiv.append(stillImage);

            $(gifDiv).data('state', 'still');
            $(gifDiv).data('stillUrl', results[i].images.fixed_width_still.url);
            $(gifDiv).data('animatedUrl', results[i].images.fixed_width.url);


        $('#gifDiv').prepend(gifDiv);
            console.log(displayTopic);
        $(gifDiv).on("click", imageState);
      }
  });
}

// IMAGE STATE FUNCTION - (STILL TO ANIMATED)==================================================================
function imageState(event) {
  var topicState = event.currentTarget;                   //specified div
  var image = $(topicState).find('img');                  //img variable
  var stillUrl = $(topicState).data('stillUrl');          //still value variable
  var animatedUrl = $(topicState).data('animatedUrl');    //animated value variable

    if($(topicState).data('state') === 'still') {
        $(topicState).data('state', 'animated');
        $(image).attr('src', animatedUrl);                  //change still/animated
    } else {
      $(topicState).data('state', 'still');
      $(image).attr('src', stillUrl);
    }
}

//$(document).on('click', '.topicBtn', displayTopic);
}) //END