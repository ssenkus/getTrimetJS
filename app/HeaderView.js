var HeaderView = Backbone.View.extend({
    tagName: 'div',
    template: _.template($('#headerTemplate').html()),
    initialize: function(options) {
        this.model = options.model;
        this.render();
    },
    events: {
        'click #submitStopId': 'updateStop'
    },
    render: function() {
        console.log();
        this.$el.html(this.template({stopId: this.model.get('stopId')}))
        return this;
    },
    updateStop: function() {
        this.model.set({stopId: 1231231});
        this.render();
    }
    
    
    
    
});


// Need to remove class info from here
// this will be table data
var ArrivalView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#arrivalTemplate').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON())).hide();
        // a quick hack to get the classes to show up, this can be removed during conversion
        this.$el.fadeIn(200);
        return this;
    }
});
