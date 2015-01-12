var APP = {};
$(document).ready(function () {
    APP.busStop = new BusStop({ stopId: 8765})
    APP.header = new HeaderView({model: APP.busStop});
    $('#header').append(APP.header.$el)
// The main result set controller
    APP.resultSet = new ResultSet();
    APP.resultSet.fetch().then(function () {
        console.log('app', APP);
        APP.mapView = new MapView({model: APP.location});

        APP.arrivals.each(function (arr) {
            console.log('arrival', arr);
            var arrView = new ArrivalView({model: arr});
            arrView.$el.appendTo('#arrivalsContainer');
        });

    });

    APP.timer = setInterval(function () {
        // remove all models
        APP.arrivals.reset();
        // get all the models
        APP.resultSet.fetch().then(function () {
            // empty the arrivals container...
            $('#arrivalsContainer').empty();
            // ...then fill it up again!
            APP.arrivals.each(function (arr) {
                var arrView = new ArrivalView({model: arr});
                arrView.$el.appendTo('#arrivalsContainer');
            });

        });
    }, 10000); // refresh every 10 seconds
});