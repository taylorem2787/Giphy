//var q - search query term or phrase
//var limit = //(optional) number of results to return,
// maximum 100. Default 25.
//var offset = //(optional) results offset, defaults to 0.
//var rating = //limit results to those rated (y,g, pg, pg-13 or r).
//var fmt = //(optional) return results in html or json format 
//(useful for viewing responses as GIFs to debug/test)
var topics = ["party hard", "celebrities", "steal yo girl", "fashion", "funny", "animals"];

    function displayTopic(){
    //ON-CLICK FUNCTION
    $('button').on('click', function(){
        var topic = $(this).attr('data-name');
        // topics.push(topic);
    
        //var topic = $(this).data('animal');
        var APIkey = "&api_key=dc6zaTOxFJmzC&limit=12";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + APIkey;

        $.ajax({
            url: queryURL, 
            method: 'GET'
        })
        .done(function(response) {
            console.log(response.data);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="item">')
                console.log(displayTopic);

                var rating = results[i].rating;
                var p = $('<p>').text("Rating: " + rating);

                var topicImage = $('<img>');
                topicImage.attr('src', results[i].images.fixed_height.url);
                console.log(displayTopic);
        //gifDiv.append(images.images.fixed_height.url); //render buttons
                gifDiv.append(p)
                gifDiv.append(topicImage)
               // gifDiv.append(results)
                
                $('#gifDiv').prepend(gifDiv);
                console.log(displayTopic);
            }
        });
    });
}
    function displayButtons(){ //create buttons

        for (var i = 0; i < topics.length; i++) {   //create one for each topic
         var b = $('<button>')  //

            b.addClass('topicBtn'); //gives div class 'topic button'
            b.attr('data-name', topics[i]); //attr. data, topics
            b.text(topics[i]);  //creates in html
            $('.button').append(b); //
        }
    }
        displayButtons(); 
        displayTopic();

// displayTopic()
// $('#gifDiv').empty();

// $('#addGiphy').on('click', function(){
//     var topic = $('#topic-input').val().trim();
//     topics.push(topic);
//     displayButtons();
//     return false;
// })

//     $(document).on('click', '.topicBtn', displayTopic);
//     displayTopic();



 //ajax call end

         // var rating = response.rating;
        // var pRating = $('<p>').text("Rating: " + rating);
        // gifDiv.append(pRating);

        // var source = response.source;
        // var pSource = $('<p>').text("Source: " + source);
        // gifDiv.append(pSource);

        // var caption = response.caption;
        // var pCaption = $('<p>').text("Caption: " + caption);
        // gifDiv.append(pCaption);

