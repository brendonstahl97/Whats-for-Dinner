$(document).ready(function () {

    var cardImgEl = $(".cardImg");
    var cardTitleEl = $(".cardTitle");
    var searchEl = $(".searchBox");
    var numRecipes = 5;
    var hasSearched = false;

    $(".heading").hide();

    //Get the array from localStorage

    if (localStorage.getItem('cuisineArr')) {
        hasSearched = true;
        $(".heading").show();


        var list = JSON.parse(localStorage.getItem('cuisineArr'));
        var l = list.length;
        var prevSearchI = list[l - 1].ingredient;
        var prevSearchC = list[l - 1].cuisineStore;

        var queryUrl2 = "https://api.spoonacular.com/recipes/complexSearch?query=" + prevSearchI + "&cuisine=" + prevSearchC + "&apiKey=b63ea46c590b456094f45bd8a111ded9";
        $.ajax({
            url: queryUrl2,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //Display most recent 5 results upon opening page
            if (response.results.length > 0) {
                var recipes = response.results.slice(0, numRecipes);
                recipes.forEach(recipe => {

                    var rowDiv = $("<div>");
                    rowDiv.addClass("row");

                    var colDiv = $("<div>");
                    colDiv.addClass("col s10 m8 offset-m1 l8");

                    var cardDiv = $("<div>");
                    cardDiv.addClass("card hoverable");

                    var cardImg = $("<div>");
                    cardImg.addClass("card-image cardImg");

                    var img = $("<img>");
                    img.attr("src", recipe.image);

                    var cardSpan = $("<span>");
                    cardSpan.addClass("card-title");
                    cardSpan.text(recipe.title);

                    var cardActionDiv = $("<div>");
                    cardActionDiv.addClass("card-content");

                    var recipeButton = $("<button>");
                    recipeButton.attr("value", recipe.id);
                    recipeButton.text("View Recipe");
                    recipeButton.addClass("btn waves-effect waves-light recipeButton");

                    cardImg.append(img);
                    cardImg.append(cardSpan);

                    cardActionDiv.append(recipeButton);

                    cardDiv.append(cardImg);
                    cardDiv.append(cardActionDiv);
                    colDiv.append(cardDiv);
                    rowDiv.append(colDiv);

                    $(".recipeContainer").append(rowDiv);
                });
            }
        });
    }

    $(".submitBtn").on("click", function (event) {
        event.preventDefault();


        $(".heading").show();

        if (hasSearched) {
            $(".recipeContainer").empty();
            hasSearched = false;

        }


        var searchTerm = searchEl.val();
        var cuisineEl = $(".dropMenu option:selected");
        var cuisine = cuisineEl.text();

        //Store items in localStorage
        var storedResults = JSON.parse(localStorage.getItem('cuisineArr')) || [];
        var newResult = { ingredient: searchTerm, cuisineStore: cuisine };
        storedResults.push(newResult);
        localStorage.setItem('cuisineArr', JSON.stringify(storedResults));

        var queryUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + searchTerm + "&cuisine=" + cuisine + "&apiKey=b63ea46c590b456094f45bd8a111ded9";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {

            if (response.results.length > 0) {

                var recipes = response.results.slice(0, numRecipes);

                recipes.forEach(recipe => {

                    var rowDiv = $("<div>");
                    rowDiv.addClass("row");

                    var colDiv = $("<div>");
                    colDiv.addClass("col s10 m8 offset-m1 l8");

                    var cardDiv = $("<div>");
                    cardDiv.addClass("card hoverable");

                    var cardImg = $("<div>");
                    cardImg.addClass("card-image cardImg");

                    var img = $("<img>");
                    img.attr("src", recipe.image);

                    var cardSpan = $("<span>");
                    cardSpan.addClass("card-title");
                    cardSpan.text(recipe.title);

                    var cardActionDiv = $("<div>");
                    cardActionDiv.addClass("card-content");

                    var recipeButton = $("<button>");
                    recipeButton.attr("value", recipe.id);
                    recipeButton.text("View Recipe");
                    recipeButton.addClass("btn waves-effect waves-light recipeButton");

                    cardImg.append(img);
                    cardImg.append(cardSpan);

                    cardActionDiv.append(recipeButton);

                    cardDiv.append(cardImg);
                    cardDiv.append(cardActionDiv);
                    colDiv.append(cardDiv);
                    rowDiv.append(colDiv);

                    $(".recipeContainer").append(rowDiv);

                });

                $(".recipeButton").on("click", function (event) {

                    event.preventDefault();
                    var queryUrl = "https://api.spoonacular.com/recipes/" + this.value + "/information?includeNutrition=false&apiKey=b63ea46c590b456094f45bd8a111ded9";

                    $.ajax({
                        url: queryUrl,
                        method: "GET"
                    }).then(function (response) {

                        window.open(response.spoonacularSourceUrl, "_blank");
                    })
                })


            } else {

                cardImgEl.attr("src", "https://memo-village.online/absolutely_nothing.png");
                cardTitleEl.text("No Recipes Found");
            }
            hasSearched = true;
        })
    })

    $(".recipeButton").on("click", function (event) {
        event.preventDefault();
        console.log(this.value);
    })
})

