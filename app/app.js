$(document).ready(function() {


    var Location = Backbone.Model.extend({
        defaults: {
        }

    });


    var MapView = Backbone.View.extend({
        createMap: function(coords) {
            console.log('createMap args', coords);
            var lat = coords[0];
            var lng = coords[1];

// -- Map --
// -- -- build Map --
            var coords = new google.maps.LatLng(lat, lng);
            var mapOptions = {
                zoom: 16,
                center: coords,
                mapTypeControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map-canvas2"), mapOptions);

            var marker = new google.maps.Marker({
                position: coords,
                title: "Trimet Stop!"
            });
            marker.setMap(map);
            this.render();
        },
        initialize: function() {
            this.createMap(this.model);
        },
        render: function() {


        }

    });


   var mapView = new MapView({ model: ['45','-122']})

    var arrivals = new Arrivals();
    arrivals.fetch().then(function() {
        console.log(arrivals)
        arrivals.each(function(arr) {
            console.log('arrival', arr)
            var arrView = new ArrivalView({model: arr})
            arrView.$el.appendTo('#arrivalsContainer');
        });

    });

    setInterval(function() {
        arrivals.reset();

        arrivals.fetch().then(function() {
            $('#arrivalsContainer').empty();
            console.log(arrivals)
            arrivals.each(function(arr) {
                console.log('arrival', arr)
                var arrView = new ArrivalView({model: arr})
                arrView.$el.appendTo('#arrivalsContainer');
            });

        });

    }, 10000);






});