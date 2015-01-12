var APP = {};
$(document).ready(function () {
    var currentId = 2580;
    
    APP.busStop = new BusStop({stopId: currentId});
    APP.header = new HeaderView({model: APP.busStop});

// The main result set controller
    APP.busStop.fetch().then(function () {
        APP.mapView = new MapView({model: APP.busStop});
        console.log('arrivals', APP.busStop.get('arrival'))
        APP.busStop.get('arrival').forEach(function (arr) {
            var arrView = new ArrivalView({model: arr});
            arrView.$el.appendTo('#arrivalsContainer');
        });
    });
    
    APP.timer = setInterval(function () {
        // remove all models
        APP.arrivals.reset();
        // get all the models
        APP.busStop.fetch().then(function () {
            // empty the arrivals container...
            $('#arrivalsContainer').empty();
            // ...then fill it up again!
            
            if (currentId !== APP.busStop.get('stopId')) {
                APP.mapView.updateLocation();
                currentId = APP.busStop.get('stopId');
            }
            
            APP.busStop.get('arrival').forEach(function (arr) {
                var arrView = new ArrivalView({model: arr});
                arrView.$el.appendTo('#arrivalsContainer');
            });

        });
    }, 3000); // refresh every 10 seconds
});