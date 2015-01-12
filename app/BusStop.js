var BusStop = Backbone.Model.extend({
    initialize: function () {
    },
    defaults: {
        stopId: 2580,
        location: {
            desc: "test desc",
            dir: "test direction",
            lat: 45.5,
            lng: -122.68
        },
        //arrivals: new Arrivals()
    },
    urlRoot: function() {
        return 'http://developer.trimet.org/ws/V1/arrivals/?appID=5E48DCD7031297B7CBF2F37FD&locIDs=' + this.get('stopId') + '&json=true';
    },
    
    parse: function (resp) {
        console.log('Bus Stop response', resp);
        APP.arrivals = new Arrivals(resp['resultSet']['arrival'], {parse: true});
        return resp['resultSet'];
    }
});