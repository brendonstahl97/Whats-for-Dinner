let form = document.getElementById('user-input');
var hasSearched = false;
var searchRadius = 24140; //In meters
var lat = 0;
var lon = 0;

//If statement before this
if(localStorage.getItem('locationArr')){
  var locList = JSON.parse(localStorage.getItem('locationArr'));
  var l = locList.length;
  var prevSearchT = locList[l-1].type;
  var prevSearchLat = locList[l-1].latitude1;
  var prevSearchLon = locList[l-1].longitude1;
  var prevSearchRad = locList[l-1].radius1;

  const proxyurl = 'https://cors-anywhere.herokuapp.com/';

  var queryUrl2 =
  "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + prevSearchT + "&type=restaurant&location=" + prevSearchLat + "," + prevSearchLon + "&radius=" + prevSearchRad + "&key=AIzaSyAz5S2li77P9Mh37AU2wN3bJ4_749FUZvY";


  $.ajax({
    url: proxyurl + queryUrl2,
    method: 'GET',
    beforeSend: function (jqXHR, settings) {
      console.log(settings.url);
    }
  }).then(function(response2) {
    hasSearched = true;
    createCards(response2);
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
}
let userLocation = getLocation();

function showPosition(position) {
  lat = "" + position.coords.latitude;
  lon = "" + position.coords.longitude;

  console.log(lat + ", " + lon);
}

$(".submitBtn").on("click", e => {
  e.preventDefault();
  let cuisine = document.getElementById('dropdown').value;

  console.log('Button pressed');
  console.log(localStorage);
  console.log('Variables: ', cuisine, lat, lon, searchRadius);

  var storedInfo = JSON.parse(localStorage.getItem('locationArr')) || [];
  var newLocSearch = {type: cuisine, latitude1: lat, longitude1: lon, radius1: searchRadius};
  storedInfo.push(newLocSearch);
  localStorage.setItem('locationArr', JSON.stringify(storedInfo));
  console.log(localStorage);

  if (hasSearched) {
    $(".restaurantContainer").empty();
    hasSearched = false;
  }

  
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  var queryUrl =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + cuisine + "&type=restaurant&location=" + lat + "," + lon + "&radius=" + searchRadius + "&key=AIzaSyAz5S2li77P9Mh37AU2wN3bJ4_749FUZvY";


  $.ajax({
    url: proxyurl + queryUrl,
    method: 'GET',
    beforeSend: function (jqXHR, settings) {
      console.log(settings.url);
    }
  }).then(function(response) {
    hasSearched = true;
    createCards(response);
  });

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

  // $(".restaurant").on("click", function(event) {
  //   window.open(event.target.value, "_blank");
  // })
}