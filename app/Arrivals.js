var Arrivals = Backbone.Collection.extend({
    model: Arrival,
    //url: trimetUrl,
    parse: function(resp) {
        console.log('Arrivals parse response',resp)
        return resp;
    }
    // validation could also help here
});