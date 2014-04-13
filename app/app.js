var APP = {};
$(document).ready(function() {

// The main result set controller
    APP.resultSet = new ResultSet();
    APP.resultSet.fetch().then(function() {
        console.log('app', APP);
        APP.arrivals.each(function(arr) {
            console.log('arrival', arr);
            var arrView = new ArrivalView({model: arr});
            arrView.$el.appendTo('#arrivalsContainer');
        });

    });
    
    APP.timer = setInterval(function() {
        // remove all models
        APP.arrivals.reset();
        // get all the models
        APP.resultSet.fetch().then(function() {
            // empty the arrivals container...
            $('#arrivalsContainer').empty();
            // ...then fill it up again!
            APP.arrivals.each(function(arr) {
                var arrView = new ArrivalView({model: arr});
                arrView.$el.appendTo('#arrivalsContainer');
            });

        });

    }, 2000); // refresh every 10 seconds
});