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
