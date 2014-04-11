// Need to remove class info from here
// this will be table data
var ArrivalView = Backbone.View.extend({
    //tagName: 'li',
    template: _.template($('#arrivalTemplate').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON())).hide();
        // a quick hack to get the classes to show up, this can be removed during conversion
        this.$el.addClass('panel panel-primary').fadeIn(500);
        return this;
    }
});
