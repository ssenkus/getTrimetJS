var MapView = Backbone.View.extend({
    createMap: function(coords) {
        console.log('createMap args', coords);
        var lat = coords.get('lat');
        var lng = coords.get('lng');

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

