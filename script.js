var cardImgEl = $(".cardImg");
var cardTitleEl = $(".cardTitle");
var searchEl = $(".searchBox");



$(".submitBtn").on("click", function (event) {
    event.preventDefault();

    var searchTerm = searchEl.val();
    var cuisine = "Italian";

    var queryUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchTerm + "&cuisine=" + cuisine + "&apiKey=b63ea46c590b456094f45bd8a111ded9";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        if (response.results[0]) {
            cardImgEl.attr("src", response.results[0].image);
            cardTitleEl.text(response.results[0].title);
        } else {
            cardImgEl.attr("src", "https://memo-village.online/absolutely_nothing.png");
            cardTitleEl.text("No Recipe");
        }

    })
})
