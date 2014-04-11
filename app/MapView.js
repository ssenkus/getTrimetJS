var MapView = Backbone.View.extend({
    createMap: function(coords) {
        // not too fancy yet
        console.log('createMap args', coords);
        var lat = coords.get('lat');
        var lng = coords.get('lng');

        var coords = new google.maps.LatLng(lat, lng);
        // these options can be set in a model
        var mapOptions = {
            zoom: 16,
            center: coords,
            mapTypeControl: true,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // this should be more Backbone-y
        var map = new google.maps.Map(document.getElementById("map-canvas2"), mapOptions);

        // this can eventually be a subview, or controlled by the model
        var marker = new google.maps.Marker({
            position: coords,
            title: "Trimet Stop!"
        });
        marker.setMap(map);
        this.render();
    },
    initialize: function() {
        // this will eventually use the Location model to fill in lat/lng and other Gmap data
        this.createMap(this.model);
    },
    render: function() {
        // perhaps move some code from this.createMap into here???

    }

});

