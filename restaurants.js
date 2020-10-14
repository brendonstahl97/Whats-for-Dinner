let form = document.getElementById("user-input");

form.addEventListener('submit',e =>{
  e.preventDefault();
   let searchTerm = document.getElementById("ingredient").value; 
   let cuisine = document.getElementById('dropdown').value;
   var queryUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + cuisine + "restaurants&key=AIzaSyAz5S2li77P9Mh37AU2wN3bJ4_749FUZvY";
   
   $.ajax({
      url: queryUrl,
      method: "GET",
      dataType:"JSONP",
      cache:false

  }).then( function(response) {
      console.log(response);
  })
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDxxU7miZ7Ya2z4gROnwiTK7BfdbdfNxcE&name=mexican";

$.ajax({
  url: proxyurl + url,
  method: "GET",
  dataType:"JSONP",
  cache:false
}).then(response => {
  console.log("response", response)
})
// .then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
})


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}
// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyDxxU7miZ7Ya2z4gROnwiTK7BfdbdfNxcE&input=mexican&inputtype=textquery



// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyAz5S2li77P9Mh37AU2wN3bJ4_749FUZvY





