
// Need to remove class info from here
// this will be table data
var ArrivalView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#arrivalTemplate').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model)).hide();
        // a quick hack to get the classes to show up, this can be removed during conversion
        this.$el.fadeIn(200);
        return this;
    }
});
