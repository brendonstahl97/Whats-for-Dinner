let form = document.getElementById('user-input');

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
}
let userLocation = getLocation();

function showPosition(position) {
  return 'location=' + position.coords.latitude + ',' + position.coords.longitude;
}

$(".submitBtn").on("click",  e => {

  e.preventDefault();
  let searchTerm = document.getElementById('ingredient').value;
  let cuisine = document.getElementById('dropdown').value;
  console.log('cuisine:', cuisine);
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  var queryUrl =
    'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' +
    cuisine +
    'restaurants&key=AIzaSyAz5S2li77P9Mh37AU2wN3bJ4_749FUZvY';
  $.ajax({
    url: proxyurl + queryUrl,
    method: 'GET',
  }).then(function (response) {
    console.log('response from 1st ajax:', response);
    createCards(response);
  });




  // const placeUrl =
  //   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${userLocation}&radius=32000&type=restaurant&keyword=${searchTerm}&key=AIzaSyAz5S2li77P9Mh37AU2wN3bJ4_749FUZvY`;
  // $.ajax({
  //   url: proxyurl + placeUrl,
  //   method: 'GET',
  // })
  //   .then(response => {
  //     console.log('place ajax response', response);
  //   })
  //   .catch(()  => console.log("Can't access " + url + " response. Blocked by browser?"));

});


function createCards(response) {
  let results = response.results.slice(0, 5);

  results.forEach(result => {

    var rowDiv = $("<div>");
    rowDiv.addClass("row");

    var colDiv = $("<div>");
    colDiv.addClass("col s10 m8 offset-m1 l8");

    var cardDiv = $("<div>");
    cardDiv.addClass("card hoverable restaurant");

    var cardImg = $("<div>");
    cardImg.addClass("card-image cardImg");

    var img = $("<img>");
    img.attr("src", `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=AIzaSyAz5S2li77P9Mh37AU2wN3bJ4_749FUZvY`);

    var cardSpan = $("<span>");
    cardSpan.addClass("card-title");
    cardSpan.text(result.name);

    var cardContent = $("<div>");
    cardContent.addClass("card-content");

    var address = document.createElement("p");
    var price = document.createElement("p");
    var rating = document.createElement("p");

    address.classList.add("address");
    price.classList.add("price");
    rating.classList.add("rating");

    address.innerHTML = result.formatted_address;
    rating.innerHTML = result.rating;

    for (let i = 0; i < result.price_level; i++) {
      price.innerHTML += "$";
    }

    cardContent.append(address);
    cardContent.append(rating);
    cardContent.append(price);

    cardImg.append(img);
    cardImg.append(cardSpan);
    cardDiv.append(cardImg);
    cardDiv.append(cardContent);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);

    $(".restaurantContainer").append(rowDiv);



  })

}

// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyDxxU7miZ7Ya2z4gROnwiTK7BfdbdfNxcE&input=mexican&inputtype=textquery
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyAz5S2li77P9Mh37AU2wN3bJ4_749FUZvY




// var rowDiv = $("<div>");
// rowDiv.addClass("row");

// var colDiv = $("<div>");
// colDiv.addClass("col s10 m8 offset-m1 l8");

// var cardDiv = $("<div>");
// cardDiv.addClass("card hoverable");

// var cardImg = $("<div>");
// cardImg.addClass("card-image cardImg");

// var img = $("<img>");
// img.attr("src", image.src);

// var cardSpan = $("<span>");
// cardSpan.addClass("card-title");

// cardSpan.text(recipe.title);
// var cardActionDiv = $("<div>");

// // cardActionDiv.addClass("card-content");
// // var recipeButton = $("<button>");

// // recipeButton.attr("value", recipe.id);
// // recipeButton.text("View Recipe");

// // recipeButton.addClass("btn waves-effect waves-light recipeButton");

// cardImg.append(img);
// cardImg.append(cardSpan);
// cardActionDiv.append(recipeButton);
// cardDiv.append(cardImg);
// cardDiv.append(cardActionDiv);
// colDiv.append(cardDiv);
// rowDiv.append(colDiv);
// $(".cardContainer").append(rowDiv);