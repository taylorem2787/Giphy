//[q- search query term or phrase] [limit = number of results to return, maximum 100. Default 25]
//[offset = results offset, defaults to 0] [rating = limit results to those rated (y,g, pg, pg-13 or r)]
//[fmt = return results in html or json format(useful for viewing responses as GIFs to debug/test)]
// ON-CLICK FUNCTION================================================================================
$(document).ready(function(){
// TOPIC/CATAGORY BUTTONS
var topics = ['art', 'animals', 'celebrities', 'dance', 'decades', 'disney', 'food', 'funny', 'love', 
              'movies', 'party hard', 'politics', 'random', 'sports', 'steal yo girl', 'tupac'];

// DISPLAY BUTTONS FUNCTION=========================================================================
function displayButtons(){ 
  $('.buttons').empty();
    // $('#gifDiv').empty();
  //CREATE BUTTONs FOR LOOP FOR EACH TOPIC
  for (var i = 0; i < topics.length; i++) {  
    var b = $('<button>') 
    //CREATED DIV CLASS 'TOPIC BUTTONs'
    b.addClass('topicBtn'); 
    b.attr('data-name', topics[i]); 
    b.text(topics[i]);  
    $('.buttons').append(b); 
  }   
}

$('#addButton').on('click', function(){
  //$('.buttons').empty();
  var topic = $('#topic-input').val().trim();
    topics.push(topic);
    displayButtons(); //add new buttons
    return false;       
});
// CALL FUNCTION====================================================================================
displayButtons(); 
// CALL FUNCTION ON CLICKS
$(document).on('click', '.topicBtn', displayTopic);

// DISPLAY TOPIC FUNCTION==========================================================================
function displayTopic(){
  // $('#gifDiv').empty();
  var topic = $(this).attr('data-name');    
    //var results = $(this).data('topics');
// GIPLY API CALL==================================================================================
  var APIkey = "&limit=20&api_key=dc6zaTOxFJmzC";
  var queryURL = 'https://crossorigin.me/http://api.giphy.com/v1/gifs/search?q=' + topic + APIkey;

    $.ajax({
      url: queryURL, 
      method: 'GET'
    })
    .done(function(response) {
      console.log(response);
      console.log(response.data);
      var results = response.data;
        for (var i = 0; i < results.length; i++){
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
// IMAGE STATE FUNCTION - (STILL TO ANIMATED)======================================================
function imageState(event) {
  // SPECIFIED DIV
  var topicState = event.currentTarget; 
  // IMG VARIABLE                
  var image = $(topicState).find('img'); 
  // STILL VALUE VARIABLE            
  var stillUrl = $(topicState).data('stillUrl'); 
  // ANIMATED VALUE VARIABLE        
  var animatedUrl = $(topicState).data('animatedUrl');    
    // CHANGE STILL/ANIMATED IF STATEMENT
    if($(topicState).data('state') === 'still') {
      $(topicState).data('state', 'animated');
      $(image).attr('src', animatedUrl);                  
    } else {
      $(topicState).data('state', 'still');
      $(image).attr('src', stillUrl);
    }
  }

//$(document).on('click', '.topicBtn', displayTopic);
}) //END