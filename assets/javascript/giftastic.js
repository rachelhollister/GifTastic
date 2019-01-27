console.log("testing here!");

//function when page loads
$(function(){
    topButtons(topics,'submitButton','#buttonsSpace');
})

//topics variable with array of emotions to use
var topics = ['anger', 'disgust', 'fear', 'happiness', 'sadness', 'surprise'];

//takes in topics variable, classes, and where it will add to on the page
function topButtons(topics,newGifs,newGifsSpace){
    $(newGifsSpace).empty();    
    for(var i=0;i<topics.length;i++){
    var a = $('<button>');
    a.addClass(newGifs);
    a.attr('data-type',topics[i]);
    a.text(topics[i]);
    $(newGifsSpace).append(a);  
}
}

//when user clicks button, generate new data, use to modify the API call
//my custom API (make sure to set a limit of 10 for the gifs, and change http to https)
$(document).on('click','.submitButton',function(){
var g = $(this).data('type');
var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' +g+ '&api_key=m3P5M7SyE5Iw53bk1sOKbmfwzvHsjp7L&limit=10';

//make API call, with a GET method, return the response in function
$.ajax({url:queryURL,method:'GET'})
.done(function(response){
for(var i=0;i<response.data.length;i++){
    var searchDiv = $('<div class="searchBox">');
    var rating = response.data[i].rating;
    var p = $('<p>').text('Rating: '+rating);
    var animated = response.data[i].images.fixed_height.url;
    var still = response.data[i].images.fixed_height_still.url;
    var image = $('<img>');   
    image.attr('src',still);
    image.attr('data-still',still);
    image.attr('data-animated',animated);
    image.attr('data-state','still');
    image.addClass('searchImage');
    searchDiv.append(p);
    searchDiv.append(image);
    $('#userSearches').append(searchDiv);
}
})
})

// gifs start as static, upon click it animates, 
//and upon second click it pauses
$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

//another function for new search from user
//user places what is in form and adds into the new search
$('#newSearch').on('click',function(){
    var newSearch = $('input').eq(0).val();
    topics.push(newSearch);
    topButtons(topics,'submitButton','#buttonsSpace');
    return false; 
})


