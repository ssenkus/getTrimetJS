var trimetUrl = 'http://developer.trimet.org/ws/V1/arrivals/?appID=5E48DCD7031297B7CBF2F37FD&locIDs=2580&json=true';


var Arrivals = Backbone.Collection.extend({
    model: Arrival,
    url: trimetUrl,
    parse: function(resp) {
        console.log(resp['resultSet']['arrival']);
        return resp['resultSet']['arrival'];
    }
});