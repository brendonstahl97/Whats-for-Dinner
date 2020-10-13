var cardImgEl = $(".cardImg");
var cardTitleEl = $(".cardTitle");
var searchEl = $(".searchBox");

var searchTerm = "Chicken";
var cuisine = "Italian";

var queryUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchTerm + "&cuisine=" + cuisine + "&apiKey=b63ea46c590b456094f45bd8a111ded9";

$.ajax({
    url: queryUrl,
    method: "GET"
}).then( function(response) {
    cardImgEl.attr("src", response.results[4].image);
    cardTitleEl.text(response.results[4].title);
})





