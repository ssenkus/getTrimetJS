$(document).ready(function() {

// Get the true map coordinates from a central API request handler object
// Placeholder using model defaults for now
    var mapView = new MapView({model: new Location()})
    
    // eventually Arrivals will be populated from central API request handler object
    // for now, Arrivals handles all API response data
    var arrivals = new Arrivals();
    arrivals.fetch().then(function() {
        console.log(arrivals)
        arrivals.each(function(arr) {
            console.log('arrival', arr)
            var arrView = new ArrivalView({model: arr})
            arrView.$el.appendTo('#arrivalsContainer');
        });

    });


    // refreshes arrivals every x seconds
    // perhaps make this part of a greater App object
    var timer = setInterval(function() {
        // remove all models
        arrivals.reset();
        // get all the models
        arrivals.fetch().then(function() {
            // empty the arrivals container...
            $('#arrivalsContainer').empty();
            console.log(arrivals)
            // ...then fill it up again!
            arrivals.each(function(arr) {
                console.log('arrival', arr)
                var arrView = new ArrivalView({model: arr})
                arrView.$el.appendTo('#arrivalsContainer');
            });

        });

    }, 10000); // refresh every 10 seconds






});