var ResultSet = Backbone.Model.extend({
    urlRoot: 'http://developer.trimet.org/ws/V1/arrivals/?appID=5E48DCD7031297B7CBF2F37FD&locIDs=2580&json=true',
    parse: function(resp) {
        console.log('ResultSet response', resp);
        APP.location = new Location(resp['resultSet']['location'][0]);        
        APP.arrivals = new Arrivals(resp['resultSet']['arrival'], {parse: true});
        return resp['resultSet'];
    }
});