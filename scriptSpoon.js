$( document ).ready(function() {
    
    var apiKey = '&apiKey=b63ea46c590b456094f45bd8a111ded9'
    var cuisine = 'cuisine=(dropdownInput)';

    
    $('button').on('click', function(){
        event.preventDefault();
        console.log('button clicked');
        getQuery = $('#email').val().trim();
        var queryInput = 'query=' + getQuery; 
        var queryURL = 'https://api.spoonacular.com/recipes/complexSearch?'+ queryInput +apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After the data comes back from the API
            .then(function(response) {
                console.log(response);
    
            });
    })
    
    
});