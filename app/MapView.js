var MapView = Backbone.View.extend({
    initialize: function (options) {
        console.log('options', options);

        // this.listenTo(this.model, 'change', this.render);
        // this will eventually use the Location model to fill in lat/lng and other Gmap data
        this.render()
    },
    updateLocation: function () {
        this.createMap();
    },
    createMap: function () {
        // not too fancy yet
        var coords = this.model.get('location')[0];
        console.log('createMap args', coords);
        var lat = coords.lat
        var lng = coords.lng;

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
    },
    render: function () {
        // perhaps move some code from this.createMap into here???
        this.createMap(this.model.get('location')[0]);
    }

});

