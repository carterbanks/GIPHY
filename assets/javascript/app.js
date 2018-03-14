var marsupials = ["Kangaroos", "Wallabies", "Koalas", "Wombats", "Tasmanian Devils", "Possoms", "Sugar Gliders"];   
var currentGif,
    pausedGif, 
    animatedGif, 
    stillGif;   



// creates Buttons 
function renderButtons() {
    // Deleting the buttons prior to adding new marsupials
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < marsupials.length; i++) {
        // Then dynamicaly generating buttons for each marsupial in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>) 
        var mammalBtn = $("<button>");
        // Adding a class of marsupial to our button
        mammalBtn.addClass("mammalBtn");
        // Adding a data-attribute
        mammalBtn.attr("data-name", marsupials[i]);
        // Providing the initial button text
        mammalBtn.text(marsupials[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(mammalBtn);
        
    }
    // display gifs on click 
    $('.mammalBtn').on('click', function () {
        $('.display').empty();

        var baseURL = "https://api.giphy.com/v1/gifs/search?&q=marsupials+";
        var thisMammal = $(this).attr('data-name');
        var params = "&limit=12";   
        var APIKey = "&api_key=M3xrT2XyJGvyb9pWXrr4HsTjLOuL0Mlz";
        var giphyURL = baseURL + thisMammal + params + APIKey;


        $.ajax({
            url: giphyURL,
            method: "GET"
        }).done(function (giphy) {
            console.log(giphy.data);  
            currentGif = giphy.data;

            $.each(currentGif, function (index, value) {
                animatedGif = value.images.original.url;
                pausedGif = value.images.original_still.url;    
                var thisRating = value.rating;
                var dataState = "still";    
                //gives blank ratings 'unrated' text
                if (thisRating === '') {
                    thisRating = 'unrated';
                }
                var rating = $('<h5>').html('Rated: ' + thisRating.toUpperCase()).addClass('ratingStyle');
                stillGif = $('<img>').attr('data-state', dataState).attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnClick').addClass('gif').addClass('img-responsive');
                var fullGifDisplay = $('<button>').append(rating, stillGif);
                $('.display').append(fullGifDisplay);
                 
            });
        })
    });
}



//animates and pauses gif on click and mousehover
$(document).on('click', '.playOnClick', function () {
    var state = $(this).attr('data-state')
    console.log(state);  
    if (state === "still") {
        $(this).attr('src', $(this).attr("data-animated"));
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr('src', $(this).attr("data-paused"));
        $(this).attr("data-state", "still")
    }

    //$(this).attr('src', $(this).data('animated'));
});

// This function handles events where one button is clicked
$("#addMammal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newMammal = $("#newMammalInput").val().trim();
    // The marsupial from the textbox is then added to our array
    marsupials.push(newMammal.toUpperCase());
    $("#newMammalInput").val('');  
    renderButtons();
 
}); 

    // Calling renderButtons which handles the processing of our marsupials array
 renderButtons();