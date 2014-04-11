var trimetUrl = 'http://developer.trimet.org/ws/V1/arrivals/?appID=5E48DCD7031297B7CBF2F37FD&locIDs=2580&json=true';

//In the future, a central JSON parsing service will be used to simplify collection creation
// for instance, the parse method here will not be 
// return resp['resultSet']['arrival'];
// instead...
// return resp;
var Arrivals = Backbone.Collection.extend({
    model: Arrival,
    url: trimetUrl,
    parse: function(resp) {
        console.log(resp['resultSet']['arrival']);
        console.log('response',resp)
        return resp['resultSet']['arrival'];
    }
    // validation could also help here
});