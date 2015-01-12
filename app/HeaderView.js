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
        this.$el.html(this.template({stopId: this.model.get('stopId')}))
        $('#header').append(this.$el);
        return this;
    },
    updateStop: function() {
        
        this.model.set({stopId: $('#stopIdInput').val() });
        this.render();
    }
    
    
    
    
});