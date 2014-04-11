var trimetUrl = 'http://developer.trimet.org/ws/V1/arrivals/?appID=5E48DCD7031297B7CBF2F37FD&locIDs=2580&json=true';
var Arrival = Backbone.Model.extend({
    defaults: {
        route: 99,
        fullSign: 'fullSign default'
    }
});

var Arrivals = Backbone.Collection.extend({
    model: Arrival,
    url: trimetUrl,
    parse: function(resp) {
        console.log(resp['resultSet']['arrival']);
        return resp['resultSet']['arrival'];
    }
});

var ArrivalView = Backbone.View.extend({
    //tagName: 'li',
    template: _.template($('#arrivalTemplate').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON())).hide();
        this.$el.addClass('panel panel-primary').fadeIn(500);
        return this;
    }
});



/*
 $.ajax({
 url: trimetUrl
 }).done(function (data) {
 alert(1)
 console.log(data)
 });
 
 
 */


$(document).ready(function() {


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

    }, 10000)



});